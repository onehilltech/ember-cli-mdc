import Service from '@ember/service';

import { isPresent } from '@ember/utils';
import { guidFor } from '@ember/object/internals';
import { assert } from '@ember/debug';

const { MDCSnackbar } = mdc.snackbar;

export default Service.extend ({
  _snackbar: null,

  init () {
    this._super (...arguments);
  },

  /**
   * Show the snackbar to the user.
   *
   * @param options
   */
  show (options) {
    // First, clean up everything.
    this._cleanup ();

    // Build the snackbar.
    this._snackbar = this._build (options);
    this._snackbar.open ();
  },

  destroy () {
    this._super (...arguments);
    this._cleanup ();
  },

  /**
   * Build a new snackbar component for the options.
   *
   * @param options
   * @private
   */
  _build (options) {
    const {
      timeout = 4000,
      closeOnEscape,
      message,
      action,
      dismissible = false
    } = options;

    const { text: actionButtonText } = (action || {});

    assert ('The timeout must be between the value of 4000 and 10000', timeout >= 4000 && timeout <= 10000);

    let html = `
      <div class="mdc-snackbar">
        <div class="mdc-snackbar__surface">
          <div class="mdc-snackbar__label" role="status" aria-live="polite">${message}</div>
          ${isPresent (actionButtonText) ? `<div class="mdc-snackbar__actions">
            <button type="button" class="mdc-button mdc-snackbar__action">
              <div class="mdc-button__ripple"></div>
              <span class="mdc-button__label">${actionButtonText}</span>
            </button>
            ${dismissible ? `<button type="button" class="mdc-snackbar__dismiss mdc-icon-button material-icons">close</button>` : ''}
          </div>` : ''}
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

    return snackbar;
  },

  /**
   * Cleanup the existing snackbar.
   *
   * @private
   */
  _cleanup () {
    if (isPresent (this._snackbar)) {
      // Remove the root element embedded in the snackbar component.
      this._snackbar.root_.remove ();

      // Destroy the snackbar component.
      this._snackbar.destroy ();
      this._snackbar = null;
    }
  }
});
