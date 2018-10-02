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
    const isCompleted = iter.isCompleted ();

    let nextStepId = iter.next () ? iter.id () : null;

    if (isCompleted && isEditable) {
      // The current step was editable. This means we came back to this step. We
      // need to find the first step that has not been completed. If we cannot
      // find a next step that is not completed, then we just use the current
      // next step.

      do {
        if (!iter.isCompleted ()) {
          nextStepId = iter.id ();
          break;
        }
      }
      while (iter.next ());
    }

    if (nextStepId) {
      this.adapter_.activate (nextStepId);
    }

    // Notify the listeners that we have completed this step.
    this.adapter_.setStepCompleted (stepId);
    this.adapter_.notifyStepComplete (stepId);

    if (this.adapter_.getIsComplete ())
      this.adapter_.notifyComplete ();

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

  /**
   * Move "active" to specified step id.
   *
   * For non-linear steppers, you can only go directly to steps that are
   * both completed and editable.
   *
   * @param {number} stepId Unique number for step.
   * @return {boolean}
   */
  goto (stepId) {
    let iter = this.adapter_.iterator (stepId);
    return iter.isCompleted () && iter.isEditable () ? this.adapter_.activate (stepId) : false;
  }
}
