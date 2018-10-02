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
    this.labelIndicatorText;
    this.labelTitle_;
    this.labelTitleText_;
    this.labelTitleMessage_;
    this.labelTitleMessageText_;

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
    this.labelIndicatorText = labelIndicatorText;

    this.label_ = this.root_.querySelector (MDCStepFoundation.strings.LABEL_SELECTOR);
    this.labelTitle_ = this.root_.querySelector (MDCStepFoundation.strings.TITLE_SELECTOR);
    this.labelTitleText_ = this.root_.querySelector (MDCStepFoundation.strings.TITLE_TEXT_SELECTOR).textContent;
    this.labelTitleMessage_ = this.root_.querySelector (MDCStepFoundation.strings.TITLE_MESSAGE_SELECTOR);
    this.labelTitleMessageText_ = this.labelTitleMessage_ ? this.labelTitleMessage_.textContent : '';

    this.labelIndicator_ = this.root_.querySelector (MDCStepFoundation.strings.LABEL_INDICATOR_SELECTOR);

    if (!this.labelIndicator_) {
      this.labelIndicator_ = this.getIndicatorElement_ ();
      this.label_.appendChild (this.labelIndicator_);
    }

    this.content_ = this.root_.querySelector (MDCStepFoundation.strings.CONTENT_SELECTOR);

    this.buttons_ = [].slice.call (this.root_.querySelectorAll (MDCStepFoundation.strings.BUTTON_SELECTOR));
    this.buttonRipples_ = [];

    for (let i = 0, buttonEl; buttonEl = this.buttons_[i]; i++) {
      this.buttonRipples_.push (new MDCRipple (buttonEl));
    }
  }

  initialSyncWithDOM () {
    this.handleInteraction_ = this.foundation_.handleInteraction.bind (this.foundation_);

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

      removeTransientEffect: () => {
        let transient = this.content_.querySelector (MDCStepFoundation.strings.TRANSIENT_SELECTOR);

        if (!transient)
          return false;

        this.root_.classList.remove (MDCStepFoundation.strings.TRANSIENT);
        this.content_.removeChild (transient);
        return true;
      },

      getLabelTitleMessageText () {
        return this.labelTitleMessageText_;
      },

      updateTitleMessage: (message) => {
        let titleMessage = this.root_.querySelector (MDCStepFoundation.strings.TITLE_MESSAGE_SELECTOR);

        if (!titleMessage) {
          titleMessage = document.createElement ('span');
          titleMessage.classList.add (MDCStepFoundation.cssClasses.TITLE_MESSAGE);
          this.labelTitle_.appendChild (titleMessage);
        }

        titleMessage.textContent = message;
      },

      removeTitleMessage: () => this.removeTitleMessage_ (),
      setLabelIndicator: (state) => this.setLabelIndicator_ (state),

      notifyNext: () => this.emit ('MDCStep:next', { stepId: this.root_.id }, true),
      notifyCancel: () => this.emit ('MDCStep:cancel', { stepId: this.root_.id }, true),
      notifySkip: () => this.emit ('MDCStep:skip', { stepId: this.root_.id }, true)
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

  setLabelIndicator_ (state, isEditable) {
    let currentIndicatorContent = this.root_.querySelector (MDCStepFoundation.strings.LABEL_INDICATOR_CONTENT_SELECTOR);
    let indicatorContent;

    switch (state) {
      case MDCStepFoundation.states.NORMAL:
        indicatorContent = MDCStep.getIndicatorContentNormal_ (this.labelIndicatorText);
        break;

      case MDCStepFoundation.states.COMPLETED:
        indicatorContent = MDCStep.getIndicatorContentCompleted_ (isEditable);
        break;

      case MDCStepFoundation.states.ERROR:
        indicatorContent = MDCStep.getIndicatorContentError_ ();
        break;

      default:
        return false;
    }

    this.labelIndicator_.replaceChild (indicatorContent, currentIndicatorContent);
  }

  /**
   * Returns the label indicator for referred to the passed step.
   *
   * @return {HTMLElement}
   * @private
   */
  getIndicatorElement_ () {
    let indicatorElement = document.createElement ('span');
    let indicatorContent = MDCStep.getIndicatorContentNormal_ (this.labelIndicatorText);
    indicatorElement.classList.add (MDCStepFoundation.cssClasses.LABEL_INDICATOR);
    indicatorElement.appendChild (indicatorContent);

    return indicatorElement;
  }

  /**
   * Create a new element that's represent "normal" label indicator.
   *
   * @param {string} text The text content of indicator (e.g. 1, 2..N).
   * @return {HTMLElement}
   *
   * @private
   */
  static getIndicatorContentNormal_ (text) {
    let normal = document.createElement ('span');
    normal.classList.add (MDCStepFoundation.cssClasses.LABEL_INDICATOR_CONTENT);
    normal.textContent = text;

    return normal;
  }

  /**
   * Create a new element that's represent "completed" label indicator.
   *
   * @param {boolean} isEditable Flag to check if step is of editable type.
   * @return {HTMLElement}
   *
   * @private
   */
  static getIndicatorContentCompleted_ (isEditable) {
    // Creates a new material icon to represent the completed step.
    let completed = document.createElement ('i');
    completed.classList.add ('material-icons');
    completed.classList.add (MDCStepFoundation.cssClasses.LABEL_INDICATOR_CONTENT);

    // If step is editable the icon used will be "edit",
    // else the icon will be "check".
    completed.textContent = isEditable ? 'edit' : 'check';

    return completed;
  }

  /**
   * Create a new element that's represent "error" label indicator.
   *
   * @return {HTMLElement}
   * @private
   */
  static getIndicatorContentError_ () {
    let error = document.createElement ('span');
    error.classList.add (MDCStepFoundation.cssClasses.LABEL_INDICATOR_CONTENT);
    error.textContent = '!';

    return error;
  }

  removeTitleMessage_ () {
    let titleMessage = this.root_.querySelector (MDCStepFoundation.strings.TITLE_MESSAGE_SELECTOR);

    if (!!titleMessage) {
      titleMessage.parentNode.removeChild (titleMessage);
    }
  }
}
