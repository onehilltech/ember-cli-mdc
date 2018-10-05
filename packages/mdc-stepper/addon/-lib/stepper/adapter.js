class MDCStepperAdapter {
  hasClass (className) {}

  isLinear () {}
  hasFeedback () {}
  hasTransient () {}

  getActiveId () {}
  getIsComplete () {}

  activate (stepId, force) {}

  setStepError (message, stepId) {}

  notifyComplete () {}

  iterator (stepId) {}
}

export default MDCStepperAdapter;