/* global mdc */

import Component from 'ember-cli-mdc-base/component';
import listener from 'ember-cli-mdc-base/listener';

import { isPresent } from '@ember/utils';
import { action, getWithDefault } from '@ember/object';

import { guidFor } from '@ember/object/internals';

const { MDCDialog } = mdc.dialog;

function noOp () { }

export default class MdcDialogComponent extends Component {
  @action
  didInsert (element) {
    let { autoStackButtons = true, open, escapeKeyAction, scrimClickAction } = this.args;

    this._dialog = new MDCDialog (element);
    this._dialog.autoStackButtons = autoStackButtons;
    this._dialog.escapeKeyAction = escapeKeyAction;
    this._dialog.scrimClickAction = scrimClickAction;

    this._mdcComponentCreated (this._dialog);
    this._openOrCloseDialog (open);
  }

  @action
  prepareDialogSurface (element) {
    // Set the id for the title element, it present.
    let guid = guidFor (element);
    let titleElement = element.querySelector ('.mdc-dialog__title');

    if (isPresent (titleElement)) {
      titleElement.id = `${guid}__title`;
      element.setAttribute ('aria-labelledby', titleElement.id);
    }

    let contentElement = element.querySelector ('.mdc-dialog__content');

    if (isPresent (contentElement)) {
      contentElement.id = `${guid}__content`;
      element.setAttribute ('aria-describedby', contentElement.id);
    }
  }

  get hasActions () {
    const { positiveButton, negativeButton } = this.args;
    return isPresent (positiveButton) || isPresent (negativeButton);
  }

  get titleId () {
    return isPresent (this._element) ? `${this._element.id}__title` : null;
  }

  get contentId () {
    return isPresent (this._element) ? `${this._element.id}__content` : null;
  }

  @action
  open (element, [open]) {
    this._openOrCloseDialog (open);
  }

  /**
   * Either show or close the dialog depending on the value of the show property.
   *
   * @private
   */
  _openOrCloseDialog (open) {
    if (open) {
      if (!this._dialog.isOpen) {
        this._dialog.open ();
      }
    }
    else {
      if (this._dialog.isOpen) {
        this._dialog.close ();
      }
    }
  }

  @listener ('MDCDialog:opening')
  opening () {
    (this.args.opening || noOp)();
  }

  @listener ('MDCDialog:opened')
  opened () {
    (this.args.opened || noOp)();
  }

  @listener ('MDCDialog:closing')
  closing ({detail: { action }}) {
    let button = this._lookupButton (action);

    if (isPresent ((button))) {
      getWithDefault (button, 'closing', noOp) ();
    }
  }

  @listener ('MDCDialog:closed')
  closed ({detail: { action }}) {
    let button = this._lookupButton (action);

    if (isPresent ((button))) {
      getWithDefault (button, 'closed', noOp) ();
    }
  }

  /**
   * Lookup the button for the given action.
   *
   * @param action
   * @returns {*}
   * @private
   */
  _lookupButton (action) {
    const { positiveButton, negativeButton } = this.args;

    if (!!positiveButton && positiveButton.action === action) {
      return positiveButton;
    }
    else if (!!negativeButton && negativeButton.action === action) {
      return negativeButton;
    }
  }
}
