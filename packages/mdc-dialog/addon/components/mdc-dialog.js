import Component from 'ember-cli-mdc-base/component';
import listener from 'ember-cli-mdc-base/listener';

import { isPresent } from '@ember/utils';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { dasherize } from '@ember/string';

import { guidFor } from '@ember/object/internals';

import { MDCDialog } from '@material/dialog';


export default class MdcDialogComponent extends Component {
  @action
  doPrepareElement (element) {
    // Locate the content element and set it compact if there is a mdc-list as
    // a direct child of the content element. This will ensure the list does not
    // have any extra padding on its sides.

    const contentElement = element.querySelector ('.mdc-dialog__content');

    if (isPresent (contentElement)) {
      this.compact = !!contentElement.querySelector ('.mdc-dialog__content > .mdc-deprecated-list');
    }

    // Prepare the buttons for the dialog if they are present. We need to make sure
    // all buttons have an action. If any of the buttons are missing the action data
    // then we should automatically add one.

    const dialogButtons = element.querySelectorAll ('.mdc-dialog__button');
    dialogButtons.forEach (button => this.prepareDialogButton (button));
  }

  prepareDialogButton (button) {
    if (!button.hasAttribute ('data-mdc-dialog-action')) {
      // The button does not have an action data attribute. Set the value of the button to
      // the classified version of the label.

      const label = button.querySelector ('.mdc-button__label');
      const action = dasherize (label.innerText);

      button.setAttribute ('data-mdc-dialog-action', action);
    }
  }

  get dialogTitleId () {
    return `${guidFor (this)}__title`;
  }

  get dialogContentId () {
    return `${guidFor (this)}__content`;
  }

  @tracked
  compact = false;

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


  get hasActions () {
    const { positiveButton, negativeButton } = this.args;
    return isPresent (positiveButton) || isPresent (negativeButton);
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

  @listener ('MDCDialog:opening')
  opening () {
    this.notifyOpening ();
  }

  notifyOpening () {
    this.willOpen ();
    this.dispatchEvent ('MdcDialog:opening');
  }

  willOpen () {

  }

  @listener ('MDCDialog:opened')
  opened () {
    this.notifyOpened ()
  }

  notifyOpened () {
    this.didOpen ();
    this.dispatchEvent ('MdcDialog:opened');
  }

  didOpen () {

  }

  @listener ('MDCDialog:closing')
  closing (ev) {
    const { detail: { action }} = ev;
    this.notifyClosing (action);
  }

  notifyClosing (action) {
    this.willClose (action);
    this.dispatchEvent ('MdcDialog:closing', { action });
  }

  willClose (action) {

  }

  @listener ('MDCDialog:closed')
  closed (ev) {
    const { detail: { action } } = ev;
    this.notifyClosed (action);
  }

  notifyClosed (action) {
    this.didClose (action);
    this.dispatchEvent ('MdcDialog:closed', { action });
  }

  didClose (action) {

  }
}
