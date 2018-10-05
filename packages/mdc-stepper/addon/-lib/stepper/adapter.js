class MDCStepperAdapter {
  hasClass (className) {}

  isLinear () {}
  hasFeedback () {}
  hasTransient () {}

  getActiveId () {}
  getIsComplete () {}

  activate (stepId, force) {}

  setStepError (stepId) {}

  updateTitleMessage (stepId, message) {}

  notifyStepComplete (stepId) {}
  notifyStepError (stepId, message) {}
  notifyComplete () {}

  iterator (stepId) {}
}

export default MDCStepperAdapter;