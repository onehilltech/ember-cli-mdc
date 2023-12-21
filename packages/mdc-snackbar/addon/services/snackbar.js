import Service from '@ember/service';

import { isPresent } from '@ember/utils';
import { guidFor } from '@ember/object/internals';

import { action } from '@ember/object';
import { assert } from '@ember/debug';
import { isString } from 'lodash';

import { MDCSnackbar } from '@material/snackbar';

function noOp () { }

export default class SnackbarService extends Service {
  _snackbar = null;

  _openingListener = null;
  _openedListener = null;
  _closingListener = null;
  _closedListener = null;

  constructor () {
    super (...arguments);

    this._openingListener = this.willOpen.bind (this);
    this._openedListener = this.didOpen.bind (this);
    this._closingListener = this.willClose.bind (this);
    this._closedListener = this.didClose.bind (this);
  }

  destroy () {
    super.destroy ();

    this._cleanup ();
  }

  /**
   * Show the snackbar to the user.
   *
   * @param options
   */
  @action
  show (options = {}) {
    // First, clean up everything.
    this._cleanup ();

    if (isString (options)) {
      options = { message: options };
    }

    // Build the snackbar.
    this._snackbar = this._build (options);
    this._snackbar.open ();
  }

  /**
   * Show an error message.
   *
   * @param reason        The error (or exception) to show.
   * @param options       The show options.
   */
  showError (reason, options = {}) {
    const message = isPresent (reason.errors) ? reason.errors[0].detail : reason.message;
    const showOptions = Object.assign ({ message, dismiss: true }, options)

    this.show (showOptions);
  }

  /**
   * Build a new snackbar component for the options.
   *
   * @param options
   * @private
   */
  _build (options) {
    const {
      timeout = 4000,
      closeOnEscape = true,
      message,
      action,
      dismiss = true,
      opening = noOp,
      opened = noOp,
      closing = noOp,
      closed = noOp,
    } = options;

    assert ('The timeout must be between the value of 4000 and 10000', timeout >= 4000 && timeout <= 10000);

    let html = `
      <div class="mdc-snackbar">
        <div class="mdc-snackbar__surface">
          <div class="mdc-snackbar__label" role="status" aria-live="polite">${message}</div>
          ${isPresent (action) || isPresent (dismiss) ? this._actionButtons (action, dismiss) : ''}
        </div>
      </div>`;

    // Create the snackbar html elements, and append it to the document.
    let snackbarFragment = document.createRange ().createContextualFragment (html);
    let snackbarElement = snackbarFragment.querySelector ('.mdc-snackbar');
    snackbarElement.id = guidFor (snackbarElement);
    document.body.appendChild (snackbarElement);

    // Create and initialize the snackbar component.
    let snackbar = new MDCSnackbar (snackbarElement);
    snackbar.timeoutMs = timeout;
    snackbar.closeOnEscape = closeOnEscape;

    snackbar.listen ('MDCSnackbar:opening', () => opening ());
    snackbar.listen ('MDCSnackbar:opened', () => opened ());

    snackbar.listen ('MDCSnackbar:closing', (ev) => closing (ev.detail));
    snackbar.listen ('MDCSnackbar:closed', (ev) => {
      const {reason} = ev.detail;

      switch (reason) {
        case 'action':
          (action.click || noOp) ();
          break;

        case 'dismiss':
          (dismiss && dismiss.click || noOp) ();
          break;
      }

      // Notify the general listener of the event.
      closed (ev.detail);
    });

    return snackbar;
  }

  _actionButtons (action, dismiss) {
    return `<div class="mdc-snackbar__actions">
              ${isPresent (action) ? this._actionButton (action.label) : ''}
              ${isPresent (dismiss) ? this._dismissButton (dismiss.icon) : ''}
            </div>`;
  }

  _actionButton (label) {
    return `<button type="button" class="mdc-button mdc-snackbar__action">
              <div class="mdc-button__ripple"></div>
              <span class="mdc-button__label">${label}</span>
            </button>`;
  }

  _dismissButton (icon = "close") {
    return `<button type="button" class="mdc-snackbar__dismiss mdc-icon-button material-icons">${icon}</button>`;
  }

  /**
   * Cleanup the existing snackbar.
   *
   * @private
   */
  _cleanup () {
    if (isPresent (this._snackbar)) {
      // Remove the root element embedded in the snackbar component.
      this._snackbar.root.remove ();

      // Destroy the snackbar component.
      this._snackbar.destroy ();
      this._snackbar = null;
    }
  }

  willOpen () {

  }

  didOpen () {

  }

  willClose () {

  }

  didClose () {

  }

  errorHandler (options = {}) {
    return (reason) => this.showError (reason, options);
  }
}
