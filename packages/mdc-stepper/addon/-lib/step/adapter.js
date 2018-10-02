class MDCStepAdapter {
  /**
   * Returns true if the root element contains the given class name.
   * @param {string} className
   * @return {boolean}
   */
  hasClass (className) {}
  addClass (className) {}
  removeClass (className) {}

  hasFeedback () {}
  isEditable () {}

  removeTransientEffect () {}

  getLabelTitleMessageText () {}

  updateTitleMessage (message) {}
  removeTitleMessage () {}

  setLabelIndicator (state) {}

  getActionFromEvent (evt) {}
  getStepFromEvent (evt) {}

  notifyNext () {}
  notifyCancel () {}
  notifySkip () {}
  notifyBack () {}
  notifyGoto (stepId) {}
}

export default MDCStepAdapter;
