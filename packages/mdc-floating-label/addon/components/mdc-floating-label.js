/* global mdc */

import Component from '@ember/component';
import layout from '../templates/components/mdc-floating-label';

export default Component.extend({
  layout,

  tagName: 'label',

  classNames: ['mdc-floating-label'],

  attributeBindings: ['for'],

  for: null,

  _floatingLabel: null,

  didInsertElement () {
    this._super (...arguments);

    this._floatingLabel = new mdc.floatingLabel.MDCFloatingLabel (this.element);
  },

  willDestroyElement () {
    this._super (...arguments);

    this._floatingLabel.destroy ();
  }
});
