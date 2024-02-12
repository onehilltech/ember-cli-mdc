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
      dismiss = { },
      stacked = false,
      leading = false,

      opening = noOp,
      opened = noOp,
      closing = noOp,
      closed = noOp,
    } = options;

    assert ('The timeout must be between the value of 4000 and 10000', timeout >= 4000 && timeout <= 10000);
    const showActionButtons = isPresent (action) || isPresent (dismiss);

    const html = `
      <div class="mdc-snackbar ${stacked ? 'mdc-snackbar--stacked' : ''} ${leading ? 'mdc-snackbar--leading' : ''}">
        <div class="mdc-snackbar__surface" role="status" aria-relevant="additions">
          <div class="mdc-snackbar__label" aria-atomic="false">${message}</div>
          ${showActionButtons ? this._actionsHtml (action, dismiss) : ''}
        </div>
      </div>`;

    // Create the snackbar html elements, and append it to the document.
    const snackbarFragment = document.createRange ().createContextualFragment (html);
    const snackbarElement = snackbarFragment.querySelector ('.mdc-snackbar');
    snackbarElement.id = guidFor (snackbarElement);
    document.body.appendChild (snackbarElement);

    // Create and initialize the snackbar component.
    const snackbar = new MDCSnackbar (snackbarElement);
    snackbar.timeoutMs = timeout;
    snackbar.closeOnEscape = closeOnEscape;

    snackbar.listen ('MDCSnackbar:opening', () => opening ());
    snackbar.listen ('MDCSnackbar:opened', () => opened ());

    snackbar.listen ('MDCSnackbar:closing', (ev) => {
      const { detail: { reason }} = ev;

      if (reason === 'action') {
        (action.closing || noOp) ();
      }
      else if (reason === 'dismiss') {
        (dismiss.closing || noOp) ();
      }
    });

    snackbar.listen ('MDCSnackbar:closed', (ev) => {
      const { detail: { reason }} = ev;

      if (reason === 'action') {
        (action.closed || noOp) ();
      }
      else if (reason === 'dismiss') {
        (dismiss.closed || noOp) ();
      }
    });

    return snackbar;
  }

  _actionsHtml (action, dismiss) {
    return `<div class="mdc-snackbar__actions" aria-atomic="true">
              ${isPresent (action) ? this._actionButtonHtml (action) : ''}
              ${isPresent (dismiss) ? this._dismissButtonHtml (dismiss) : ''}
            </div>`;
  }

  _actionButtonHtml (options = {}) {
    const { label } = options;

    return `<button type="button" class="mdc-button mdc-snackbar__action">
              <div class="mdc-button__ripple"></div>
              <span class="mdc-button__label">${label}</span>
            </button>`;
  }

  _dismissButtonHtml (options = {}) {
    if (options === true) {
      options = {};
    }
    else if (options === false) {
      return '';
    }

    const {
      title = 'Dismiss',
      icon = 'close'
    } = options;

    return `<button type="button" class="mdc-icon-button mdc-snackbar__dismiss material-icons" title="${title}">${icon}</button>`;
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

  opening () {

  }

  opened () {

  }

  willClose () {

  }

  didClose () {

  }

  errorHandler (options = {}) {
    return (reason) => this.showError (reason, options);
  }
}
