import MDCStepperBaseFoundation from '../foundation';
import MDCStepperAdapter from '../adapter';

export default class MDCLinearStepperFoundation extends MDCStepperBaseFoundation {
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
   * In linear steppers, if the current step is editable the stepper needs to find
   * the next step without "completed" state.
   *
   * @return {boolean}
   */

  next (stepId = null) {
    let iter = this.adapter_.iterator (stepId);
    const isEditable = iter.isEditable ();

    let nextStepId = iter.next () ? iter.id () : null;

    if (isEditable) {
      // The current step was editable. This means we came back to this step. We
      // need to find the first step that has not been completed. If we cannot
      // find a next step that is not completed, then we just use the current
      // next step.

      while (iter.next ()) {
        if (!iter.isCompleted ()) {
          nextStepId = iter.id ();
          break;
        }
      }
    }

    if (nextStepId) {
      this.adapter_.activate (nextStepId);
    }

    // Notify the listeners that we have completed this step.
    this.adapter_.setStepCompleted (stepId);
    this.adapter_.notifyStepComplete (stepId);

    return !!nextStepId;
  }

  /**
   * Move "active" to the previous step if the previous step is editable.
   *
   * @return {boolean}
   */
  back (stepId = null) {
    let iter = this.adapter_.iterator (stepId);
    let prevStepId = iter.previous () && iter.isEditable () ? iter.id () : null;

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
