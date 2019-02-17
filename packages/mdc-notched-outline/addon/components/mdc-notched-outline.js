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

  didInsertElement () {
    this._super (...arguments);

    this._notchedOutline = new MDCNotchedOutline (this.element);
  },

  willDestroyElement () {
    this._super (...arguments);

    // Destroy the component, and then remove the notched outline idle element
    // we added when the component element was inserted into the DOM.

    this._notchedOutline.destroy ();
  }
});
