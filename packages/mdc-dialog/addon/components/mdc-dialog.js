/* global mdc */

import Component from '@ember/component';
import layout from '../templates/components/mdc-dialog';
import { or } from '@ember/object/computed';
import { isPresent } from '@ember/utils';
import { getWithDefault } from '@ember/object';

const MDCDialog = mdc.dialog.MDCDialog;

function noOp () {

}

export default Component.extend({
  layout,

  tagName: 'div',

  classNames: ['mdc-dialog'],

  classNameBindings: ['stackButtons:mdc-dialog--stacked'],

  attributeBindings: ['role'],

  role: 'alertdialog',

  scrollable: false,

  stackButtons: false,

  hasActions: or ('positiveButton', 'negativeButton'),

  _dialog: undefined,

  _willOpenEventListener: undefined,
  _didOpenEventListener: undefined,

  _willCloseEventListener: undefined,
  _didCloseEventListener: undefined,

  _contentElement: undefined,

  init () {
    this._super (...arguments);

    this._willOpenEventListener = this.willOpen.bind (this);
    this._didOpenEventListener = this.didOpen.bind (this);

    this._willCloseEventListener = this.willClose.bind (this);
    this._didCloseEventListener = this.didClose.bind (this);
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
    this._dialog.listen ('MDCDialog:opening', this._willOpenEventListener);
    this._dialog.listen ('MDCDialog:opened', this._didOpenEventListener);
    this._dialog.listen ('MDCDialog:closing', this._willCloseEventListener);
    this._dialog.listen ('MDCDialog:closed', this._didCloseEventListener);

    this._contentElement = this.element.querySelector ('.mdc-dialog__content');

    if (this.get ('show')) {
      this._dialog.open ();
    }
  },

  willDestroyElement () {
    this._super (...arguments);

    this._dialog.unlisten ('MDCDialog:opening', this._willOpenEventListener);
    this._dialog.unlisten ('MDCDialog:opened', this._didOpenEventListener);
    this._dialog.unlisten ('MDCDialog:closing', this._willCloseEventListener);
    this._dialog.unlisten ('MDCDialog:closed', this._didCloseEventListener);

    this._dialog.destroy ();
  },

  willOpen () {
    this.getWithDefault ('opening', noOp) ();
  },

  didOpen () {
    // Implement the accessibility recommendations. For more details, see
    // https://github.com/material-components/material-components-web/tree/v2.0.0/packages/mdc-dialog#accessibility

    if (isPresent (this._contentElement)) {
      this._contentElement.setAttribute('aria-hidden', 'true');
    }

    this.getWithDefault ('opened', noOp) ();
  },

  willClose ({detail: {action}}) {
    // Implement the accessibility recommendations. For more details, see
    // https://github.com/material-components/material-components-web/tree/v2.0.0/packages/mdc-dialog#accessibility

    if (isPresent (this._contentElement)) {
      this._contentElement.removeAttribute ('aria-hidden');
    }

    let button = this._getButtonFromAction (action);

    if (isPresent ((button))) {
      getWithDefault (button, 'closing', noOp) ();
    }
  },

  didClose ({detail: {action}}) {
    this.set ('show', false);

    let button = this._getButtonFromAction (action);

    if (isPresent ((button))) {
      getWithDefault (button, 'closed', noOp) ();
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
  },

  _getButtonFromAction (action) {
    const { positiveButton, negativeButton } = this.getProperties (['positiveButton', 'negativeButton']);

    if (!!positiveButton && positiveButton.action === action) {
      return positiveButton;
    }
    else if (!!negativeButton && negativeButton.action === action) {
      return negativeButton;
    }
  }
});
