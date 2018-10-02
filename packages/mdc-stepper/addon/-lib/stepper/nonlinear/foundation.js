import MDCStepperBaseFoundation from '../foundation';
import MDCStepperAdapter from '../adapter';

export default class MDCNonLinearStepperFoundation extends MDCStepperBaseFoundation {
  /**
   * @param {!MDCStepperAdapter} adapter
   */
  constructor (adapter) {
    super (adapter);
  }

  /**
   * Defines current step state to "completed" and move active to the next.
   * This operation can returns false if it does not advance the step.
   *
   * For non-linear steppers, the next step is the next step in the stepper.
   *
   * @return {boolean}
   */
  next (stepId = null) {
    let iterator = this.adapter_.iterator (stepId);
    let nextStepId = iterator.next () ? iterator.id () : null;

    if (nextStepId) {
      this.adapter_.activate (nextStepId);
    }

    // Notify the listeners that we have completed this step.
    this.adapter_.setStepCompleted (stepId);
    this.adapter_.notifyStepComplete (stepId);

    return !!nextStepId;
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
