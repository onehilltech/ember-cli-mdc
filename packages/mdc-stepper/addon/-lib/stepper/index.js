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
      findNextStepToComplete: (stepId) => this.findNextStepIdToComplete_ (stepId),

      notifyStepComplete: (stepId) => this.emit ('MDCStep:complete', {stepId}, true)
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
   * This operation is similar to the MaterialStepper.setActive_(<number>).
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
      // We know that all steps previous the "active" are "completed"
      // case the stepper is linear
      this.updateLinearStates_();
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
   * Defines as "active" the first step or a specific id.
   * @param {number | undefined} id Unique number of a step.
   * @return {boolean}
   * @private
   */
  setActive_ (id) {
    /** @type {boolean} */
    let moved = false;

    // Return false if specified id is less or equal 0 and bigger than the last step
    if (!isNaN (id) && ((id > this.steps.length) || (id <= 0))) {
      return false;
    }

    if (id) {
      let step = this.steps.find (step => step.id === id);

      if (step) {
        this.setStepActive_ (step)
      }
    }
    else {
      let active = this.root_.querySelector (MDCStepperFoundation.strings.IS_ACTIVE_SELECTOR);

      if (!active) {
        // Set the first step as "active" if none id was specified and
        // no "active" step was found at the DOM.
        moved = this.setStepActive_(this.steps[0]);
      }
    }

    if (this.foundation_.isLinear ()) {
      // We know that all steps previous the "active" are "completed"
      // case the stepper is linear
      this.updateLinearStates_();
    }

    return moved;
  }

  /**
   * Change the state of a step
   * @param {MaterialStepper.Steps_.collection<step>} step The step to be updated.
   * @param {string} state The step state ("completed", "error" or "normal").
   * @return {boolean}
   * @private
   */
  updateStepState_ (step, state) {
    /** @type {string} */
    let stateClass;
    /** @type {HTMLElement} */
    let indicatorContent;
    /** @type {HTMLElement} */
    let currentIndicatorContent;
    /** @type {boolean} */
    let stepperCompleted;
    /** @type {boolean} */
    let hasRequired;
    /** @type {MaterialStepper.Steps_.collection<stepItem>} */
    let stepItem;
    /** @type {number} */
    let item;
    /** @type {string} */
    let selectorIndicator;
    selectorIndicator = '.' + this.CssClasses_.STEP_LABEL_INDICATOR_CONTENT;

    // Can't update the state for the same.
    if (step.state === state) return false;

    // Case the current step state to change is "completed",
    // we can decrement the total number of completed.
    if (step.state === this.StepState_.COMPLETED) {
      this.Steps_.completed -= 1;
    }
    currentIndicatorContent = step.labelIndicator.querySelector(selectorIndicator);

    switch (state) {
      case this.StepState_.COMPLETED:
      {
        // Case changing the current step state to "completed",
        // we can increment the total number of completed.
        this.Steps_.completed += 1;
        step.container.classList.remove(this.CssClasses_.STEP_ERROR);
        indicatorContent = this.getIndicatorContentCompleted_(step.isEditable);
        stateClass = this.CssClasses_.STEP_COMPLETED;
        break;
      }
      case this.StepState_.ERROR:
      {
        step.container.classList.remove(this.CssClasses_.STEP_COMPLETED);
        indicatorContent = this.getIndicatorContentError_();
        stateClass = this.CssClasses_.STEP_ERROR;
        break;
      }
      case this.StepState_.NORMAL:
      {
        step.container.classList.remove(this.CssClasses_.STEP_COMPLETED);
        step.container.classList.remove(this.CssClasses_.STEP_ERROR);
        indicatorContent = this.getIndicatorContentNormal_(step.labelndicatorText);
        break;
      }
      default: {
        break;
      }
    }

    // "normal" is the default state and don't have specific css class.
    if (stateClass) {
      step.container.classList.add(stateClass);
    }
    step.labelIndicator.replaceChild(indicatorContent, currentIndicatorContent);
    step.state = state;

    // Case the total number of completed steps
    // are equal the total number of steps less the optionals
    // or total number of completed steps are equal the total number of steps,
    // we can consider that the stepper are successfully complete and
    // dispatch the custom event.
    stepperCompleted = false;

    if (this.Steps_.completed === this.Steps_.total) {
      stepperCompleted = true;
    } else if (this.Steps_.completed === (this.Steps_.total - this.Steps_.optional)) {
      for (item in this.Steps_.collection) {
        // eslint guard-for-in.
        if (this.Steps_.collection.hasOwnProperty(item)) {
          stepItem = this.Steps_.collection[item];
          hasRequired = (!stepItem.isOptional && (stepItem.state !== this.StepState_.COMPLETED));

          if (hasRequired) break;
        }
      }
      stepperCompleted = !hasRequired;
    }

    if (stepperCompleted) {
      this.dispatchEventOnStepperComplete_();
    }

    return true;
  }

  /**
   * Change to "completed" the state of all steps previous the "active"
   * except the optionals.
   * @return {undefined}
   * @private
   */
  updateLinearStates_ () {
    /** @type {number} */
    let i;

    for (i = 0; i < this.Steps_.total; i++) {
      if (this.Steps_.collection[i].isActive) {
        break;
      } else {
        if (this.Steps_.collection[i].isOptional) continue;

        this.updateStepState_(this.Steps_.collection[i], this.StepState_.COMPLETED);
      }
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
   * Add event listener to linear, non-linear steppers and dispatch the custom events.
   * @return {undefined}
   */
  setCustomEvents_ () {
    /** @type {function} */
    let linearLabels;
    /** @type {function} */
    let nonLinearLabels;
    /** @type {function} */
    let dispatchCustomEvents;

    linearLabels = function (step) {
      // We know that editable steps can be activated by click on label case it's completed
      if (step.isEditable) {
        step.label.addEventListener('click', function (event) {
          event.preventDefault();

          if (step.state === this.StepState_.COMPLETED) {
            this.setStepActive_(step);
          }
        }.bind(this));
      }
    };
    nonLinearLabels = function (step) {
      step.label.addEventListener('click', function (event) {
        event.preventDefault();
        this.setStepActive_(step);
      }.bind(this));
    };
    dispatchCustomEvents = function (step) {
      this.dispatchEventOnStepNext_(step);
      this.dispatchEventOnStepCancel_(step);
      this.dispatchEventOnStepSkip_(step);
      this.dispatchEventOnStepBack_(step);
    };

    if (this.Stepper_.isLinear) {
      this.Steps_.collection.forEach(linearLabels.bind(this));
    } else {
      this.Steps_.collection.forEach(nonLinearLabels.bind(this));
    }
    this.Steps_.collection.forEach(dispatchCustomEvents.bind(this));
  }

  /**
   * Dispatch "onstepcomplete" event on step when method stepper.next() is invoked to the
   * current and return true. Or just when the active step change your state to "completed".
   * @param {MaterialStepper.Steps_.collection<step>} step The step to dispatch event.
   * @return {undefined}
   */
  dispatchEventOnStepComplete_ (step) {
    step.container.dispatchEvent(this.CustomEvents_.onstepcomplete);
  }

  /**
   * Dispatch "onsteperror" event on step when method stepper.error('Your alert message')
   * is invoked to the current step and return true. Or just when the active step
   * change your state to "error".
   * @param {MaterialStepper.Steps_.collection<step>} step The step to dispatch event.
   * @return {undefined}
   */
  dispatchEventOnStepError_ (step) {
    step.container.dispatchEvent(this.CustomEvents_.onsteperror);
  }

  /**
   * Dispatch "onsteppercomplete" event on stepper when all steps are completed.
   * If there is optionals steps, they will be ignored.
   * @return {undefined}
   */
  dispatchEventOnStepperComplete_ () {
    this.element_.dispatchEvent(this.CustomEvents_.onsteppercomplete);
  }

  /**
   * Dispatch "onstepnext" event on step when the step action button/link with
   * [data-stepper-next] attribute is clicked.
   * @param {MaterialStepper.Steps_.collection<step>} step The step to dispatch event.
   * @return {boolean}
   */
  dispatchEventOnStepNext_ (step) {
    if (!step.actionsNext) return false;

    step.actionsNext.addEventListener('click', function () {
      if (this.Stepper_.hasFeedback) {
        this.addTransientEffect_(step);
      }
      step.container.dispatchEvent(this.CustomEvents_.onstepnext);
    }.bind(this));

    return true;
  }

  /**
   * Dispatch "onstepcancel" event on step when the step action button/link with
   * [data-stepper-cancel] attribute is clicked.
   * @param {MaterialStepper.Steps_.collection<step>} step The step to dispatch event.
   * @return {boolean}
   */
  dispatchEventOnStepCancel_ (step) {
    if (!step.actionsCancel) return false;

    step.actionsCancel.addEventListener('click', function (event) {
      event.preventDefault();
      step.container.dispatchEvent(this.CustomEvents_.onstepcancel);
    }.bind(this));

    return true;
  }

  /**
   * Dispatch "onstepskip" event on step when the step action button/link with
   * [data-stepper-skip] attribute is clicked.
   * @param {MaterialStepper.Steps_.collection<step>} step The step to dispatch event.
   * @return {boolean}
   */
  dispatchEventOnStepSkip_ (step) {
    if (!step.actionsSkip) return false;

    step.actionsSkip.addEventListener('click', function (event) {
      event.preventDefault();
      step.container.dispatchEvent(this.CustomEvents_.onstepskip);
    }.bind(this));
    return true;
  }

  /**
   * Dispatch "onstepback" event on step when the step action button/link with
   * [data-stepper-back] attribute is clicked.
   * @param {MaterialStepper.Steps_.collection<step>} step The step to dispatch event.
   * @return {boolean}
   */
  dispatchEventOnStepBack_ (step) {
    if (!step.actionsBack) return false;

    step.actionsBack.addEventListener('click', function (event) {
      event.preventDefault();
      step.container.dispatchEvent(this.CustomEvents_.onstepback);
    }.bind(this));
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

  /**
   * Initialize the instance.
   * @return {undefined}
   * @public
   */
  init () {
    // Check if stepper element exists.
    if (this.element_) {
      this.Stepper_ = this.getStepper_();
      this.Steps_ = this.getSteps_();
      this.setActive_();
      this.setCustomEvents_();
    }
  }
}
