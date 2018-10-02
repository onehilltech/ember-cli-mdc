const { MDCFoundation } = mdc.base;
import MDCStepperAdapter from './adapter';

import { cssClasses, strings } from './constants';

export default class MDCStepperFoundation extends MDCFoundation {
  static get cssClasses() {
    return cssClasses;
  }

  static get strings () {
    return strings;
  }

  static get defaultAdapter () {
    return /** @type {!MDCStepperAdapter} */ ({
      hasClass: () => {},
      isLinear: () => {},
      hasFeedback: () => {},
      hasTransient: () => {}
    });
  }

  /**
   * @param {!MDCStepperAdapter} adapter
   */
  constructor (adapter) {
    super (Object.assign (MDCStepperFoundation.defaultAdapter, adapter));
  }

  hasFeedback () {
    return this.adapter_.hasFeedback ();
  }

  hasTransient () {
    return this.adapter_.hasTransient ();
  }

  isLinear () {
    return this.adapter_.isLinear ();
  }

  handleInteraction (evt) {
    if (evt.type === 'MDCStep:next') {
      this.next (evt.detail.stepId);
    }
    else if (evt.type === 'MDCStep:skip') {
      this.skip (evt.detail.stepId);
    }
    else if (evt.type === 'MDCStep:back') {
      this.back (evt.detail.stepId);
    }
  }

  getActiveId () {
    return this.adapter_.getActiveId ()
  }

  /**
   * Defines current step state to "completed" and move active to the next.
   * This operation can returns false if it does not advance the step.
   *
   * @return {boolean}
   */
  next (stepId = null) {
    let nextStepId = this.adapter_.findNextStepToComplete (stepId);
    let moved = false;

    if (nextStepId) {
      moved = this.adapter_.activate (nextStepId);
    }

    // Update "manually" the state of current step to "completed" because
    // MaterialStepper.setActive_(<number>) can't change the state of non-linears steppers
    // and can't change the state of optional or last step in linears steppers.
    if (this.adapter_.isLinear ()) {
      if (step.isOptional || (step.id === this.Steps_.total)) {
        this.updateStepState_(step, this.StepState_.COMPLETED);
      }
    }
    else {
      this.adapter_.setStepCompleted (stepId);
    }

    // Notify the listeners that we have completed this step.
    this.adapter_.notifyStepComplete (stepId);

    return moved;
  }

  /**
   * Move "active" to the previous step. This operation can returns false
   * if it does not regress the step.
   *
   * @return {boolean}
   */
  back (stepId = null) {
    let prevStepId = this.adapter_.findPrevStepToComplete (stepId);
    return !!prevStepId ? this.adapter_.activate (prevStepId) : false;
  }

  skip (stepId = null) {
    let nextStepId = this.adapter_.findNextStepToComplete (stepId);
    return !!nextStepId ? this.adapter_.activate (nextStepId) : false;
  }

  /**
   * Move "active" to specified step id.
   *
   * @param {number} stepId Unique number for step.
   * @return {boolean}
   */
  goto (stepId) {
    return this.adapter_.activate (stepId);
  }

  /**
   * Defines the current state of step to "error" and display
   * an alert message instead of default title message.
   *
   * @param {string} message The text content to show with error state.
   * @return {undefined}
   */
  error (message) {
    let stepId = this.adapter_.getActiveId ();

    if (this.adapter_.hasFeedback ()) {
      // TODO remove transient feedback from current step.
    }

    this.adapter_.setStepError (stepId);

    if (!!message)
      this.adapter_.updateTitleMessage (stepId, message);

    this.adapter_.notifyStepError (stepId, message);
  }
}
