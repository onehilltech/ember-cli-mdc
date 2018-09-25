/* global mdc */

import Component from '@ember/component';
import layout from '../templates/components/mdc-dialog';
import { or, readOnly } from '@ember/object/computed';

import { Promise } from 'rsvp';

const MDCDialog = mdc.dialog.MDCDialog;

function noOp () {

}

export default Component.extend({
  layout,

  tagName: 'aside',

  classNames: ['mdc-dialog'],

  attributeBindings: ['role'],

  role: 'alertdialog',

  scrollable: false,

  _hasAcceptButton: or ('accept', 'acceptButtonText'),
  _hasCancelButton: or ('cancel', 'cancelButtonText'),
  _hasFooter: or ('_hasAcceptButton', '_hasCancelButton'),

  hasAcceptButton: readOnly ('_hasAcceptButton'),
  hasCancelButton: readOnly ('_hasCancelButton'),
  hasFooter: readOnly ('_hasFooter'),

  _dialog: null,

  _dialogAcceptListener: null,
  _dialogCancelListener: null,

  init () {
    this._super (...arguments);

    this._dialogAcceptListener = this._doAction.bind (this, 'accept');
    this._dialogAcceptListener = this._doAction.bind (this, 'cancel');
  },

  didUpdateAttrs () {
    this._super (...arguments);
    this._showOrCloseDialog ();
  },

  /**
   * Either show or close the dialog depending on the value of the show property.
   *
   * @private
   */
  _showOrCloseDialog () {
    if (this.get ('show')) {
      if (!this._dialog.isOpen)
        this._dialog.open ();
    }
    else {
      if (this._dialog.isOpen)
        this._dialog.close ();
    }
  },

  didInsertElement () {
    this._super (...arguments);
    this._setupAttributes ();

    this._dialog = new MDCDialog (this.element);
    this._dialog.listen ('MDCDialog:accept', this._dialogAcceptListener);
    this._dialog.listen ('MDCDialog:cancel', this._dialogCancelListener);

    if (this.get ('show')) {
      this._dialog.open ();
    }
  },

  willDestroyElement () {
    this._super (...arguments);

    this._dialog.unlisten ('MDCDialog:accept', this._dialogAcceptListener);
    this._dialog.unlisten ('MDCDialog:cancel', this._dialogCancelListener);
    this._dialog.destroy ();
  },

  _doAction (name) {
    const action = this.getWithDefault (name, noOp);

    return Promise.resolve (action ())
      .then (result => {
        if (result === undefined || result === null || result)
          this.set ('show', false);
      })
      .catch (() => {
        // Force the dialog the show again if we failed.
        this._dialog.open ();
      });
  },

  _setupAttributes () {
    // Setup the aria properties on the element.
    const $label = this.$('mdc-dialog__header__title');

    if ($label.length > 0) {
      this.element.setAttribute ('aria-labelledby', $label[0]);
    }

    const $description = this.$('mdc-dialog__body');

    if ($description.length > 0) {
      this.element.setAttribute ('aria-describedby', $description[0]);
    }
  }
});
