/* globals mdc */

import Mixin from '@ember/object/mixin';

import { computed } from '@ember/object';
import { isPresent } from '@ember/utils';

const { MDCRipple } = mdc.ripple;

export default Mixin.create ({
  classNames: ['mdc-ripple-surface'],

  classNameBindings: ['mdcRippleColorClassName'],

  mdcRippleColorClassName: computed ('rippleColor', function () {
    const rippleColor = this.get ('rippleColor');
    return isPresent (rippleColor) ? `mdc-ripple-surface--${rippleColor}` : null;
  }),

  // Set the ripple color. The acceptable values are "primary" or "accent".
  rippleColor: null,

  /// The instance of the MDCRipple component.
  _ripple: null,

  /// Force the creation of the MDC ripple component. This is only required if the
  /// target MDC component does not create a ripple component.
  createRippleComponent: false,

  didInsertElement () {
    this._super (...arguments);

    if (this.createRippleComponent) {
      this._ripple = new MDCRipple (this.element);
      this._ripple.unbounded = this.get ('unbounded');
    }
  },

  willDestroyElement () {
    this._super (...arguments);

    if (!!this._ripple) {
      this._ripple.destroy ();
    }
  }
});
