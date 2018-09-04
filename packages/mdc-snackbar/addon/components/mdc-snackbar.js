/* global mdc */

import Component from '@ember/component';
import layout from '../templates/components/mdc-snackbar';
import { assert } from '@ember/debug';
import { isPresent } from '@ember/utils';

const MDCSnackbar = mdc.snackbar.MDCSnackbar;

export default Component.extend({
  layout,

  classNames: ['mdc-snackbar'],

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

  didInsertElement () {
    this._super (...arguments);

    this._snackbar = new MDCSnackbar (this.element);
    this._snackbar.listen ('MDCSnackbar:show', this.didShow.bind (this));
    this._snackbar.listen ('MDCSnackbar:hide', this.didHide.bind (this));

    this.element.setAttribute ('aria-live', 'assertive');
    this.element.setAttribute ('aria-atomic', true);
    this.element.setAttribute ('aria-hidden', true);

    const message = this.get ('message');

    if (isPresent (message)) {
      this.show (message);
    }
  },

  didUpdate () {
    this._super (...arguments);

    const message = this.get ('message');

    if (isPresent (message)) {
      this.show (message);
    }
  },

  willDestroyElement () {
    this._super (...arguments);

    this._snackbar.unlisten ('MDCSnackbar:show', this.didShow.bind (this));
    this._snackbar.unlisten ('MDCSnackbar:hide', this.didHide.bind (this));
    this._snackbar.destroy ();
  },

  show (message) {
    const {
      timeout,
      actionText,
      actionHandler,
      multiline,
      actionOnBottom
    } = this.getProperties (['timeout','actionHandler','actionText','multiline','actionOnBottom']);

    this._snackbar.dismissesOnAction = this.getWithDefault ('dismissesOnAction', true);
    this._snackbar.show ({ message, actionText, actionHandler, timeout, multiline, actionOnBottom });
  },

  /**
   * The snackbar is showing to the user.
   */
  didShow () {

  },

  /**
   * The snackbar is hidden from the user.
   */
  didHide () {
    // Erase the message so we can show the snackbar again.
    this.set ('message');
  }
});
