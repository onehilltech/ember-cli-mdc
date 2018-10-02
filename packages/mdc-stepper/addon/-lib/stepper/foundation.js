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
      this.next (evt.detail.stepId)
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

  skip () {
    /** @type {boolean} */
    var moved;
    /** @type {string} */
    var model;
    /** @type {MaterialStepper.Steps_.collection<step>} */
    var step;
    moved = false;

    for (model in this.Steps_.collection) {
      // Rule eslint guard-for-in.
      if (this.Steps_.collection.hasOwnProperty(model)) {
        step = this.Steps_.collection[model];

        if (step.isActive) {
          if (step.isOptional) {
            moved = this.setActive_((step.id + 1));

            if (moved && this.Stepper_.hasFeedback) {
              // Remove the (feedback) transient effect before move
              this.removeTransientEffect_(step);
            }
          }
          break;
        }
      }
    }
    return moved;
  }
}
