/* global mdc */

import Component from '@ember/component';
import layout from '../templates/components/mdc-notched-outline';

import { isPresent } from '@ember/utils';

const { MDCNotchedOutline } = mdc.notchedOutline;

export default Component.extend({
  layout,

  classNames: ['mdc-notched-outline'],
  classNameBindings: ['notched:mdc-notched-outline--notched'],

  _notchedOutline: null,

  /// The idle element automatically added as a sibling to this component.
  _notchedOutlineIdle: null,

  didInsertElement () {
    this._super (...arguments);

    this._insertNotchedOutlineIdle ();
    this._notchedOutline = new MDCNotchedOutline (this.element);
  },

  willDestroyElement () {
    this._super (...arguments);

    // Destroy the component, and then remove the notched outline idle element
    // we added when the component element was inserted into the DOM.

    this._notchedOutline.destroy ();

    if (isPresent (this._notchedOutlineIdle)) {
      this._notchedOutlineIdle.remove ();
    }
  },

  _insertNotchedOutlineIdle () {
    this._notchedOutlineIdle = document.createElement ('div');
    this._notchedOutlineIdle.classList.add ('mdc-notched-outline__idle');

    this.element.parentElement.insertBefore (this._notchedOutlineIdle, this.element.nextSibling);
  }
});
