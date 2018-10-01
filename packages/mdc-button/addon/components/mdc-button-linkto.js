/* global mdc */

import LinkComponent from '@ember/routing/link-component';
import ButtonMixin from '../mixins/button';

const { MDCRipple } = mdc.ripple;

export default LinkComponent.extend (ButtonMixin, {
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
