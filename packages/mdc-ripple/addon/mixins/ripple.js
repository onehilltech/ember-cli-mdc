/* globals mdc */

import Mixin from '@ember/object/mixin';

import { computed } from '@ember/object';
import { isPresent } from '@ember/utils';

const MDCRipple = mdc.ripple.MDCRipple;

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

  didInsertElement () {
    this._super (...arguments);

    this._ripple = new MDCRipple (this.element);
  },

  willDestroyElement () {
    this._super (...arguments);

    this._ripple.destroy ();
  }
});
