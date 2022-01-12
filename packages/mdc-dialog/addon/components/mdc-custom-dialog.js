/* global mdc */

import Component from 'ember-cli-mdc-base/component';

import { isPresent } from '@ember/utils';
import { action } from '@ember/object';

import { guidFor } from '@ember/object/internals';

const { MDCDialog } = mdc.dialog;

export default class MdcDialogComponent extends Component {
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

  prepareDialogActionButtons (element) {
    let buttons = element.querySelectorAll('.mdc-dialog__actions .mdc-button');
    buttons.forEach(btn => btn.classList.add('mdc-dialog__button'));
  }

  doCreateComponent (element) {
    return new MDCDialog (element);
  }

  doInitComponent (dialog) {
    const { autoStackButtons = true, open, escapeKeyAction, scrimClickAction } = this.args;

    dialog.autoStackButtons = autoStackButtons;
    dialog.escapeKeyAction = escapeKeyAction;
    dialog.scrimClickAction = scrimClickAction;

    this._openOrCloseDialog (open);
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
      if (!this.component.isOpen) {
        this.component.open ();
      }
    }
    else {
      if (this.component.isOpen) {
        this.component.close ();
      }
    }
  }

}
