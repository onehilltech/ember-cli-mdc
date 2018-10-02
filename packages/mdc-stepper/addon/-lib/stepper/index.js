/* global mdc */

const { MDCComponent } = mdc.base;

import MDCStepperBaseFoundation from './foundation';
import MDCLinearStepperFoundation from './linear/foundation';
import MDCNonLinearStepperFoundation from './nonlinear/foundation';

import MDCStepperAdapter from './adapter';

export { MDCStepperBaseFoundation, MDCLinearStepperFoundation, MDCNonLinearStepperFoundation };
import { MDCStep } from '../step/index';

import MDCStepIterator from './iterator';

const STEP_EVENT_TYPES = [
  'MDCStep:next',
  'MDCStep:skip',
  'MDCStep:back'
];

/**
 * MDCStepIterator
 */
class StepIteratorImpl extends MDCStepIterator {
  constructor (stepper, index = 0) {
    super ();

    this.index_ = index;
    this.stepper_ = stepper;
  }

  next () {
    if (this.index_ >= this.stepper_.steps.length - 1)
      return false;

    ++ this.index_;
    return true;
  }

  previous () {
    if (this.index_ === 0)
      return false;

    -- this.index_;
    return true;
  }

  done () {
    return this.index_ >= this.stepper_.steps.length;
  }

  id () {
    return this.stepper_.steps[this.index_].id;
  }

  isEditable () {
    return this.stepper_.steps[this.index_].isEditable;
  }

  isCompleted () {
    return this.stepper_.steps[this.index_].isCompleted;
  }

  isOptional () {
    return this.stepper_.steps[this.index_].isOptional;
  }

  isActive () {
    return this.stepper_.steps[this.index_].isActive;
  }

  isError () {
    return this.stepper_.steps[this.index_].isError;
  }

  isNormal () {
    return this.stepper_.steps[this.index_].isNormal;
  }
}

/**
 * @class MDCStepper
 */
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
    const adapter = /** @type {!MDCStepperAdapter} */ (Object.assign ({
      hasClass: (className) => this.root_.classList.contains (className),

      isLinear: () => this.isLinear_,
      hasFeedback: () => this.root_.classList.contains (MDCStepperBaseFoundation.cssClasses.STEPPER_FEEDBACK),
      hasTransient: () => this.hasTransient_ (),

      activate: this.activate_.bind (this),
      getActiveId: () => this.findActiveStep_ ().id,

      setStepCompleted: (stepId) => this.findStep_ (stepId).setStepCompleted (),
      setStepError: (stepId) => this.findStep_ (stepId).setStepError (),

      updateTitleMessage: (stepId, message) => this.findStep_ (stepId).titleMessage = message,

      notifyStepComplete: (stepId) => this.emit ('MDCStep:complete', {stepId}, true),
      notifyStepError: (stepId, message) => this.emit ('MDCStep:error', {stepId, message}, true),

      iterator: (stepId) => {
        let index = !!stepId ? this.findStepIndex_ (stepId) : 0;
        return new StepIteratorImpl (this, index);
      }
    }));

    let foundation;

    if (this.root_.classList.contains (MDCStepperBaseFoundation.cssClasses.STEPPER_LINEAR)) {
      foundation = new MDCLinearStepperFoundation (adapter);
    }
    else {
      foundation = new MDCNonLinearStepperFoundation (adapter);
    }

    return foundation;
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
   * Instantiates step  components on all of the stepper's child step elements.
   *
   * @param stepFactory
   * @private
   */
  instantiateSteps_ (stepFactory) {
    const stepElements = [].slice.call (this.root_.querySelectorAll (MDCStepperBaseFoundation.strings.STEP_SELECTOR));

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
   * @param force
   */
  activate_ (stepId, force = false) {
    const step = this.findStep_ (stepId);

    if (!step)
      return false;

    if (this.hasTransient_ ()) {
      // The transient effect blocks the stepper from moving.
      if (!force)
        return false;

      step.removeTransientEffect ();
    }

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
   * Find the step for the given id.
   * @param stepId
   * @return {*}
   * @private
   */
  findStep_ (stepId) {
    return this.steps.find (step => step.id === stepId);
  }

  /**
   * Find the index for a step.
   *
   * @param stepId
   * @return {number | *}
   * @private
   */
  findStepIndex_ (stepId) {
    return this.steps.findIndex (step => step.id === stepId);
  }

  /**
   * Find the index of the active step.
   *
   * @return {*}
   * @private
   */
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
    } = MDCStepperBaseFoundation.strings;

    let selectorTransient = `${STEP_SELECTOR} > ${STEP_CONTENT_SELECTOR} > ${TRANSIENT_SELECTOR}`;
    !!this.root_.querySelector (selectorTransient);
  }

  get isLinear_ () {
    return this.root_.classList.contains (MDCStepperBaseFoundation.cssClasses.STEPPER_LINEAR);
  }
}
