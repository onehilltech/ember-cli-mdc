/* global mdc */

import Component from '@ember/component';
import layout from '../templates/components/mdc-snackbar';
import { assert } from '@ember/debug';

const MDCSnackbar = mdc.snackbar.MDCSnackbar;

export default Component.extend({
  layout,

  classNames: ['mdc-snackbar'],

  /// Controls the visibility of the snackbar.
  show: false,

  /// Message to show in the snackbar.
  message: null,

  /// Timeout value for the snackbar.
  timeout: null,

  /// The handler for action.
  actionHandler: null,

  /// The action text. This is required if actionHandler exists.
  actionText: null,

  /// The message is multiple lines.
  multiline: null,

  /// Align the action to the bottom of a multi-line message.
  actionOnBottom: null,

  /// Dismisses the snackbar when the action is clicked.
  dismissesOnAction: true,

  /// Reference to the MDC instance.
  _snackbar: null,

  didReceiveAttrs () {
    this._super (...arguments);

    if (!this.get ('show')) {
      return;
    }

    const {
      message,
      timeout,
      actionText,
      actionHandler,
      multiline,
      actionOnBottom
    } = this.getProperties (['message','timeout','actionHandler','actionText','multiline','actionOnBottom']);

    assert ('You must set the message attribute.', !!message);
    assert ('You must set actionText if you set actionHandler.', !actionHandler || !!actionText);

    this._snackbar.dismissesOnAction = this.getWithDefault ('dismissesOnAction', true);
    this._snackbar.show ({ message, actionText, actionHandler, timeout, multiline, actionOnBottom });
  },

  didInsertElement () {
    this._super (...arguments);

    this._snackbar = new MDCSnackbar (this.element);
    this._snackbar.listen ('MDCSnackbar:show', this.didShow.bind (this));
    this._snackbar.listen ('MDCSnackbar:hide', this.didHide.bind (this));

    this.element.setAttribute ('aria-live', 'assertive');
    this.element.setAttribute ('aria-atomic', true);
    this.element.setAttribute ('aria-hidden', true);
  },

  /**
   * The snackbar is showing to the user.
   */
  didShow () {
    this.sendAction ('showing');
  },

  /**
   * The snackbar is hidden from the user.
   */
  didHide () {
    this.set ('show', false);
    this.sendAction ('hide');
  }
});
