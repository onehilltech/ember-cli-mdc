/* global mdc */

import Component from '@ember/component';
import layout from '../templates/components/mdc-button';
import ButtonMixin from '../mixins/button';

const { MDCRipple } = mdc.ripple;

export default Component.extend (ButtonMixin, {
  layout,

  tagName: 'button',

  _buttonRipple: null,

  didInsertElement () {
    this._super (...arguments);

    this._buttonRipple = new MDCRipple (this.element);
  },

  willDestroyElement () {
    this._super (...arguments);

    this._buttonRipple.destroy ();
  }
});
