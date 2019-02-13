/* global mdc */

import Component from '@ember/component';
import layout from '../templates/components/mdc-snackbar';

import { isPresent } from '@ember/utils';
import { alias } from '@ember/object/computed';

const MDCSnackbar = mdc.snackbar.MDCSnackbar;

export default Component.extend({
  layout,

  classNames: ['mdc-snackbar'],

  classNameBindings: ['stacked:mdc-snackbar--stacked', 'leading:mdc-snackbar--leading'],

  /// Message to show in the snackbar. Setting the message will show
  /// the snackbar to the user.
  message: null,

  label: alias ('message'),

  stacked: false,

  leading: false,

  /// Timeout value for the snackbar.
  timeout: 5000,

  /// Close the snackbar when ESC pressed.
  closeOnEscape: true,

  /// Reference to the MDC instance.
  _snackbar: null,

  _didOpenListener: null,
  _didCloseListener: null,

  init () {
    this._super (...arguments);

    this._didOpenListener = this.didOpen.bind (this);
    this._didCloseListener = this.didClose.bind (this);
  },

  didInsertElement () {
    this._super (...arguments);

    this._snackbar = new MDCSnackbar (this.element);
    this._snackbar.listen ('MDCSnackbar:opened', this._didOpenListener);
    this._snackbar.listen ('MDCSnackbar:closed', this._didCloseListener);

    const message = this.get ('message');

    if (isPresent (message)) {
      this.show ();
    }
  },

  didUpdate () {
    this._super (...arguments);

    const message = this.get ('message');

    if (isPresent (message)) {
      this.show ();
    }
  },

  willDestroyElement () {
    this._super (...arguments);

    this._snackbar.unlisten ('MDCSnackbar:opened', this._didOpenListener);
    this._snackbar.unlisten ('MDCSnackbar:closed', this._didCloseListener);
    this._snackbar.destroy ();
  },

  show () {
    const { timeout, closeOnEscape } = this.getProperties (['timeout','closeOnEscape']);

    this._snackbar.closeOnEscape = closeOnEscape;
    this._snackbar.timeoutMs = timeout;
    this._snackbar.open ();
  },

  /**
   * The snackbar is showing to the user.
   */
  didOpen () {

  },

  /**
   * The snackbar is hidden from the user.
   */
  didClose () {
    // Erase the message so we can show the snackbar again.
    this.set ('message');
  }
});
