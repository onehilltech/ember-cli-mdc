/* global mdc */

const { MDCComponent } = mdc.base;

import MDCStepperFoundation from './foundation';
import MDCStepperAdapter from './adapter';

export { MDCStepperFoundation };
import { MDCStep } from '../step/index';

const STEP_EVENT_TYPES = [
  'MDCStep:next',
  'MDCStep:skip'
];

export class MDCStepper extends MDCComponent {
  /**
   * @param {...?} args
   */
  constructor(...args) {
    super(...args);

    /** @type {!Array<!MDCStep>} */
    this.steps;

    /** @private {(function(!Element): !MDCStep)} */
    this.stepFactory_;

    this.completed_;

    this.optional_;

    this.active_;

    /** @private {!Function} */
    this.handleInteraction_;
  }

  static attachTo (root) {
    return new MDCStepper (root);
  }

  get hasFeedback () {
    return this.foundation_.hasFeedback ();
  }

  getDefaultFoundation () {
    return new MDCStepperFoundation (/** @type {!MDCStepperAdapter} */ ({
      hasClass: (className) => this.root_.classList.contains (className),

      isLinear: () => this.root_.classList.contains (MDCStepperFoundation.cssClasses.STEPPER_LINEAR),
      hasFeedback: () => this.root_.classList.contains (MDCStepperFoundation.cssClasses.STEPPER_FEEDBACK),
      hasTransient: () => this.hasTransient_ (),

      activate: (stepId) => this.activate_ (stepId),
      getActiveId: () => this.findActiveStep_ ().id,

      setStepCompleted: (stepId) => this.findStep_ (stepId).setStepCompleted (),
      setStepError: (stepId) => this.findStep_ (stepId).setStepError (),

      findNextStepToComplete: (stepId) => this.findNextStepIdToComplete_ (stepId),
      updateTitleMessage: (stepId, message) => this.findStep_ (stepId).titleMessage = message,

      notifyStepComplete: (stepId) => this.emit ('MDCStep:complete', {stepId}, true),
      notifyStepError: (stepId, message) => this.emit ('MDCStep:error', {stepId, message}, true)
    }));
  }

  initialize (stepFactory = (el, stepper, ordinal) => new MDCStep (el, undefined, stepper, ordinal)) {
    this.stepFactory_ = stepFactory;
    this.steps = this.instantiateSteps_ (this.stepFactory_);
  }

  initialSyncWithDOM () {
    this.handleInteraction_ = this.foundation_.handleInteraction.bind (this.foundation_);

    // Make sure there is an initial state.
    let step = this.findActiveStep_ () || this.steps[0];
    this.activateStep_ (step);

    // Listen for step events.
    STEP_EVENT_TYPES.forEach (eventType => this.listen (eventType, this.handleInteraction_));
  }

  destroy () {
    // Stop listening for step events.
    STEP_EVENT_TYPES.forEach (eventType => this.unlisten (eventType, this.handleInteraction_));

    super.destroy ();
  }

  /**
   * Get the active step id.
   *
   * @return {number}
   */
  get activeId () {
    return this.foundation_.getActiveId ();
  }

  /**
   * Move "active" to the next if the current step is optional. This operation can returns false
   * if it does not advances the step.
   * @return {boolean}
   */
  skip () {
    return this.foundation_.skip ();
  }

  /**
   * Move "active" to specified step id.
   *
   * @param {number} id Unique number for step.
   * @return {boolean}
   */
  goto (id) {
    return this.foundation_.goto (id);
  }

  /**
   * Defines the current state of step to "error" and display
   * an alert message instead of default title message.
   * @param {string} message The text content to show with error state.
   * @return {undefined}
   */
  error (message) {
    return this.foundation_.error (message);
  }

  /**
   * Defines current step state to "completed" and move active to the next.
   * This operation can returns false if it does not advance the step.
   * @return {boolean}
   */
  next () {
    return this.foundation_.next ();
  }

  /**
   * Move "active" to the previous step. This operation can returns false
   * if it does not regress the step.
   * @return {boolean}
   */
  back () {
    return this.foundation_.back ();
  }

  /**
   * Instantiates step  components on all of the stepper's child step elements.
   *
   * @param stepFactory
   * @private
   */
  instantiateSteps_ (stepFactory) {
    const stepElements = [].slice.call (this.root_.querySelectorAll (MDCStepperFoundation.strings.STEP_SELECTOR));

    return stepElements.map ((el, i) => {
      let step = stepFactory (el, this, i + 1);

      if (step.isOptional) {
        this.optional_ += 1;
      }

      if (step.isActive) {
        this.active_ = step.id;
      }

      // Prevents the step label to scrolling out of user view on Google Chrome.
      // More details here: <https://github.com/ahlechandre/mdl-stepper/issues/11 />.
      stepElements[i].addEventListener ('scroll', (event) => event.target.scrollTop = 0);

      return step;
    });
  }

  /**
   * Activate the step by id.
   *
   * @param stepId
   */
  activate_ (stepId) {
    const step = this.findStep_ (stepId);

    if (!step)
      return false;

    // The transient effect blocks the stepper to move
    if (this.hasTransient_ ())
      return false;

    // Deactivate each step in the stepper.
    return this.activateStep_ (step);
  }

  /**
   * Activate the step.
   *
   * @param step
   * @return {boolean}
   * @private
   */
  activateStep_ (step) {
    this.steps.forEach (step => step.isActive = false);

    // Let's activate this step.
    step.isActive = true;

    if (this.foundation_.isLinear ()) {
      // Mark all the steps before the new active step as completed.
      this.updateLinearStates_ ();
    }

    return true;
  }

  /**
   * Find the next step to complete depending on the stepper style.
   *
   * @param stepId
   * @private
   */
  findNextStepIdToComplete_ (stepId = this.findActiveStep_ ().id) {
    let index = this.findStepIndex_ (stepId);

    if (index === -1)
      return null;

    if (index >= this.steps.length - 1)
      return null;

    let step = this.steps[index];
    let nextStepId = this.steps[index + 1].id;

    if (step.isEditable && this.isLinear) {
      // In linear steppers if the current step is editable the stepper needs to find
      // the next step without "completed" state

      for (let i = index + 1, length = this.steps.length; i < length; ++ i) {
        let nextStep = this.steps[i];

        if (nextStep.isCompleted)
          return nextStep.id;
      }
    }

    return nextStepId;
  }

  findStep_ (stepId) {
    return this.steps.find (step => step.id === stepId);
  }

  findStepIndex_ (stepId) {
    return this.steps.findIndex (step => step.id === stepId);
  }

  /**
   * Create a new element that's represent "completed" label indicator.
   * @param {boolean} isEditable Flag to check if step is of editable type.
   * @return {HTMLElement}
   * @private
   */
  getIndicatorContentCompleted_ (isEditable) {
    // Creates a new material icon to represent the completed step.
    /** @type {HTMLElement} */
    let completed;
    completed = document.createElement('i');
    completed.classList.add('material-icons');
    completed.classList.add(this.CssClasses_.STEP_LABEL_INDICATOR_CONTENT);
    // If step is editable the icon used will be "edit",
    // else the icon will be "check".
    completed.textContent = isEditable ? 'edit' : 'check';
    return completed;
  }

  /**
   * Create a new element that's represent "error" label indicator.
   * @return {HTMLElement}
   * @private
   */
  getIndicatorContentError_ () {
    /** @type {HTMLElement} */
    let error;
    error = document.createElement('span');
    error.classList.add (this.CssClasses_.STEP_LABEL_INDICATOR_CONTENT);
    error.textContent = '!';
    return error;
  }

  findActiveStep_ () {
    return this.steps.find (step => step.isActive);
  }

  /**
   * Change to "completed" the state of all steps previous the "active"
   * except the optionals.
   * @return {undefined}
   * @private
   */
  updateLinearStates_ () {
    for (let i = 0, length = this.steps.length; i < length; ++ i) {
      let step = this.steps[i];

      if (step.isActive)
        break;

      if (step.isOptional)
        continue;

      step.setStepCompleted ();
    }
  }


  /**
   * Update the title message or creates a new if it not exists.
   * @param {MaterialStepper.Steps_.collection<step>} step The step of label to be updated.
   * @param {string} text The text content to update.
   * @return {undefined}
   */
  updateTitleMessage_ (step, text) {
    /** @type {HTMLElement | null} */
    let titleMessage;
    titleMessage = step.container.querySelector('.' + this.CssClasses_.STEP_TITLE_MESSAGE);

    if (!titleMessage) {
      titleMessage = document.createElement('span');
      titleMessage.classList.add(this.CssClasses_.STEP_TITLE_MESSAGE);
      step.labelTitle.appendChild(titleMessage);
    }
    titleMessage.textContent = text;
  }

  /**
   * Remove the title message if it exists.
   * @param {MaterialStepper.Steps_.collection<step>} step The step to remove title message.
   * @return {undefined}
   */
  removeTitleMessage_ (step) {
    /** @type {HTMLElement | null} */
    let titleMessage;
    titleMessage = step.container.querySelector('.' + this.CssClasses_.STEP_TITLE_MESSAGE);

    if (titleMessage) {
      titleMessage.parentNode.removeChild(titleMessage);
    }
  }

  /**
   * Remove (feedback) transient effect and applied to the step.
   * @param {MaterialStepper.Steps_.collection<step>} step The step to remove effect.
   * @return {boolean}
   */
  removeTransientEffect_ (step) {
    /** @type {HTMLElement | null} */
    let transient;
    transient = step.content.querySelector('.' + this.CssClasses_.TRANSIENT);

    if (!transient) return false;

    step.container.classList.remove(this.CssClasses_.STEP_TRANSIENT);
    step.content.removeChild(transient);
    return true;
  }

  /**
   * Create (feedback) transient effect and apply to the current step.
   * @param {MaterialStepper.Steps_.collection<step>} step The step to add effect.
   * @return {boolean}
   */
  addTransientEffect_ (step) {
    /** @type {HTMLElement} */
    let transient;
    /** @type {HTMLElement} */
    let overlay;
    /** @type {HTMLElement} */
    let loader;
    /** @type {HTMLElement} */
    let spinner;

    if (step.content.querySelector('.' + this.CssClasses_.TRANSIENT)) return false;

    transient = document.createElement('div');
    overlay = document.createElement('div');
    loader = document.createElement('div');
    spinner = document.createElement('div');
    transient.classList.add(this.CssClasses_.TRANSIENT);
    overlay.classList.add(this.CssClasses_.TRANSIENT_OVERLAY);
    loader.classList.add(this.CssClasses_.TRANSIENT_LOADER);
    spinner.classList.add(this.CssClasses_.SPINNER);
    spinner.classList.add(this.CssClasses_.SPINNER_JS);
    spinner.classList.add(this.CssClasses_.SPINNER_IS_ACTIVE);
    loader.appendChild(spinner);
    transient.appendChild(overlay);
    transient.appendChild(loader);
    step.container.classList.add(this.CssClasses_.STEP_TRANSIENT);
    step.content.appendChild(transient);
    // Assume componentHandler is available in the global scope.
    componentHandler.upgradeDom();
    return true;
  }

  /**
   * Check if has some active transient effect on steps.
   * @return {boolean}
   */
  get hasTransient () {
    return this.foundation_.hasTransient ();
  }

  hasTransient_ () {
    const {
      STEP_SELECTOR,
      STEP_CONTENT_SELECTOR,
      TRANSIENT_SELECTOR
    } = MDCStepperFoundation.strings;

    let selectorTransient = `${STEP_SELECTOR} > ${STEP_CONTENT_SELECTOR} > ${TRANSIENT_SELECTOR}`;
    !!this.root_.querySelector (selectorTransient);
  }
}
