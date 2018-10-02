class MDCStepperAdapter {
  /**
   * Returns true if the root element contains the given class name.
   * @param {string} className
   * @return {boolean}
   */
  hasClass (className) {}

  isLinear () {}
  hasFeedback () {}
  hasTransient () {}

  findNextStepToComplete () {}

  getActiveId () {}
  activate (stepId) {}

  setStepCompleted (stepId) {}

  notifyStepComplete (stepId) {}
}

export default MDCStepperAdapter;