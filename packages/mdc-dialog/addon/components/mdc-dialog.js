/* global mdc */

import Component from '@ember/component';
import layout from '../templates/components/mdc-dialog';
import { or, equal } from '@ember/object/computed';

const MDCDialog = mdc.dialog.MDCDialog;

function noOp () {

}

export default Component.extend({
  layout,

  tagName: 'div',

  classNames: ['mdc-dialog'],

  attributeBindings: ['role'],

  role: 'alertdialog',

  scrollable: false,

  /// Set the default button. It should be accept or close.
  default: null,

  acceptIsDefault: equal ('default', 'accept'),
  closeIsDefault: equal ('default', 'close'),

  hasAcceptButton: or ('accept', 'acceptButtonText'),
  hasCloseButton: or ('close', 'closeButtonText'),
  hasActions: or ('hasAcceptButton', 'hasCloseButton'),

  _dialog: null,

  _openingEventListener: null,
  _openedEventListener: null,

  _closingEventListener: null,
  _closedEventListener: null,

  init () {
    this._super (...arguments);

    this._openingEventListener = this.willOpen.bind (this);
    this._openedEventListener = this.didOpen.bind (this);

    this._closingEventListener = this.willClose.bind (this);
    this._closedEventListener = this.didClose.bind (this);
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
    this._dialog.listen ('MDCDialog:opening', this._openingEventListener);
    this._dialog.listen ('MDCDialog:opened', this._openedEventListener);
    this._dialog.listen ('MDCDialog:closing', this._closingEventListener);
    this._dialog.listen ('MDCDialog:closed', this._closedEventListener);

    if (this.get ('show')) {
      this._dialog.open ();
    }
  },

  willDestroyElement () {
    this._super (...arguments);

    this._dialog.unlisten ('MDCDialog:opening', this._openingEventListener);
    this._dialog.unlisten ('MDCDialog:opened', this._openedEventListener);
    this._dialog.unlisten ('MDCDialog:closing', this._closingEventListener);
    this._dialog.unlisten ('MDCDialog:closed', this._closedEventListener);

    this._dialog.destroy ();
  },

  willOpen () {
    this.getWithDefault ('opening', noOp) ();
  },

  didOpen () {
    this.getWithDefault ('opened', noOp) ();
  },

  willClose ({detail: {action}}) {
    if (action === 'accept') {
      this.getWithDefault ('accepting', noOp) ();
    }
    else if (action === 'close') {
      this.getWithDefault ('closing', noOp) ();
    }
  },

  didClose ({detail: {action}}) {
    this.set ('show', false);

    if (action) {
      this.getWithDefault (action, noOp) ();
    }
  },

  _setupAttributes () {
    // Setup the aria properties on the element.
    this.element.setAttribute ('aria-modal', true);

    const title = this.element.querySelector ('.mdc-dialog__title');

    if (title) {
      this.element.setAttribute ('aria-labelledby', title.id);
    }

    const content = this.element.querySelector ('.mdc-dialog__content');

    if (content) {
      this.element.setAttribute ('aria-describedby', content.id);
    }
  }
});
