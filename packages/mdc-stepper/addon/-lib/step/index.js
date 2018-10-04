/* global mdc */

const { MDCComponent } = mdc.base;
const { MDCRipple } = mdc.ripple;

import { MDCStepFoundation } from './foundation';
import MDCStepAdapter from './adapter';

export { MDCStepFoundation };

const { closest } = mdc.dom.ponyfill;

export class MDCStep extends MDCComponent {
  /**
   * @param {...?} args
   */
  constructor (...args) {
    super (...args);

    this.label_;
    this.labelIndicatorText_;
    this.labelTitle_;
    this.labelTitleText_;
    this.labelTitleMessage_;

    /** @private {!Array<!Element>} */
    this.buttons_;

    /** @private {!Array<!MDCRipple>} */
    this.buttonRipples_;

    /** @private {!Function} */
    this.handleInteraction_;

    /** @private {!Array<!HTMLElement>} */
    this.content_;

    /** @private {!HTMLElement} */
    this.labelIndicator_;

    this.labelIndicatorContent_;
  }

  /**
   * @param {!Element} root
   * @return {!MDCStep}
   */
  static attachTo (root) {
    return new MDCStep (root);
  }

  initialize (stepper, labelIndicatorText) {
    this.stepper_ = stepper;
    this.labelIndicatorText_ = labelIndicatorText;

    this.optional_ = 0;

    this.label_ = this.root_.querySelector (MDCStepFoundation.strings.LABEL_SELECTOR);
    this.labelTitle_ = this.root_.querySelector (MDCStepFoundation.strings.TITLE_SELECTOR);
    this.labelTitleText_ = this.root_.querySelector (MDCStepFoundation.strings.TITLE_TEXT_SELECTOR).textContent;
    this.labelTitleMessage_ = this.root_.querySelector (MDCStepFoundation.strings.TITLE_MESSAGE_SELECTOR);

    this.labelIndicator_ = this.root_.querySelector (MDCStepFoundation.strings.LABEL_INDICATOR_SELECTOR);

    if (!this.labelIndicator_)
      throw new Error ('The step must have a <span> with the class mdc-step__label-indicator.');

    this.labelIndicatorContent_ = this.labelIndicator_.querySelector (MDCStepFoundation.strings.LABEL_INDICATOR_CONTENT_SELECTOR);

    if (!this.labelIndicatorContent_)
      throw new Error ('The mdc-step__label-indicator element must have a <span> with the class mdc-step__label-indicator-content.');

    this.labelIndicatorContent_.textContent = this.labelIndicatorText_;

    this.content_ = this.root_.querySelector (MDCStepFoundation.strings.CONTENT_SELECTOR);

    this.buttons_ = [].slice.call (this.root_.querySelectorAll (MDCStepFoundation.strings.BUTTON_SELECTOR));
    this.buttonRipples_ = [];

    for (let i = 0, buttonEl; buttonEl = this.buttons_[i]; i++) {
      this.buttonRipples_.push (new MDCRipple (buttonEl));
    }
  }

  initialSyncWithDOM () {
    this.handleInteraction_ = this.foundation_.handleInteraction.bind (this.foundation_);
    this.setLabelIndicator_ (MDCStepFoundation.states.NORMAL, this.foundation_.isEditable ());

    // Listen for click events on the page.
    this.listen ('click', this.handleInteraction_);
  }

  destroy () {
    // Stop listening for click events.
    this.listen ('click', this.handleInteraction_);

    // Destroy the ripples for each button on the page.
    for (let i = 0, buttonRipple; buttonRipple = this.buttonRipples_[i]; i++) {
      buttonRipple.destroy ();
    }

    super.destroy ();
  }

  getDefaultFoundation () {
    return new MDCStepFoundation (/** @type {!MDCStepAdapter} */ ({
      addClass: (className) => this.root_.classList.add (className),
      removeClass: (className) => this.root_.classList.remove (className),
      hasClass: (className) => this.root_.classList.contains (className),

      hasFeedback: () => this.stepper_.hasFeedback,

      getActionFromEvent: (event) => {
        const element = closest (event.target, `[${MDCStepFoundation.strings.ACTION_ATTRIBUTE}]`);
        return element && element.getAttribute (MDCStepFoundation.strings.ACTION_ATTRIBUTE);
      },

      getStepFromEvent: (event) => {
        const element = closest (event.target, MDCStepFoundation.strings.LABEL_SELECTOR);
        return element && element.parentElement.id;
      },

      removeTransientEffect: this.removeTransientEffect_.bind (this),

      getLabelTitleMessageText: () => this.labelTitleMessage_.textContent,

      setTitleMessage: message => {
        if (this.labelTitleMessage_)
          this.labelTitleMessage_.textContent = message;
      },

      setLabelIndicator: this.setLabelIndicator_.bind (this),

      notifyNext: () => this.emit ('MDCStep:next', { stepId: this.root_.id }, true),
      notifyCancel: () => this.emit ('MDCStep:cancel', { stepId: this.root_.id }, true),
      notifySkip: () => this.emit ('MDCStep:skip', { stepId: this.root_.id }, true),
      notifyBack: () => this.emit ('MDCStep:back', { stepId: this.root_.id }, true),
      notifyGoto: (stepId) => this.emit ('MDCStep:goto', { stepId }, true)
    }));
  }

  get id () {
    return this.root_.id;
  }

  set isActive (isActive) {
    this.foundation_.setActive (isActive);
  }

  get isActive () {
    return this.foundation_.isActive ();
  }

  get isOptional () {
    return this.foundation_.isOptional ();
  }

  get isEditable () {
    return this.foundation_.isEditable ();
  }

  get isCompleted () {
    return this.foundation_.isCompleted ();
  }

  get isError () {
    return this.foundation_.isError ();
  }

  get isNormal () {
    return this.foundation_.isNormal ();
  }

  setStepCompleted () {
    return this.foundation_.setStepCompleted ();
  }

  setStepError () {
    return this.foundation_.setStepError ();
  }

  set titleMessage (message) {
    this.foundation_.setTitleMessage (message);
  }

  /**
   * Set the label indicator for the step.
   *
   * @param state
   * @param isEditable
   * @return {boolean}
   * @private
   */
  setLabelIndicator_ (state, isEditable) {
    switch (state) {
      case MDCStepFoundation.states.NORMAL:
        this.labelIndicatorContent_.classList.remove ('material-icons');
        this.labelIndicatorContent_.textContent = this.labelIndicatorText_;
        break;

      case MDCStepFoundation.states.COMPLETED:
        this.labelIndicatorContent_.classList.add ('material-icons');
        this.labelIndicatorContent_.textContent = isEditable ? 'edit' : 'check';
        break;

      case MDCStepFoundation.states.ERROR:
        this.labelIndicatorContent_.classList.remove ('material-icons');
        this.labelIndicatorContent_.textContent = '!';
        break;

      default:
        return false;
    }
  }

  /**
   * Remove the transient effect from the step if it exists.
   *
   * @return {boolean}
   * @private
   */
  removeTransientEffect_ () {
    let transient = this.content_.querySelector (MDCStepFoundation.strings.TRANSIENT_SELECTOR);

    if (!transient)
      return false;

    this.root_.classList.remove (MDCStepFoundation.strings.TRANSIENT);
    this.content_.removeChild (transient);
    return true;
  }

  /**
   * Update the title message, creating one if it does not exist.
   *
   * @param message
   * @private
   */
  setTitleMessage_ (message) {
    if (this.labelTitleMessage_)
      this.labelTitleMessage_.textContent = message;
  }
}
