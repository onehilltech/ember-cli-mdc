/* global mdc */

import Component from '@ember/component';
import layout from '../templates/components/mdc-ripple';
import RippleMixin from '../mixins/ripple';

export default Component.extend (RippleMixin, {
  layout,

  /// The instance of the MDCRipple component.
  _ripple: null,

  didInsertElement () {
    this._super (...arguments);

    this._ripple = new mdc.ripple.MDCRipple (this.element);
  },

  willDestroyElement () {
    this._super (...arguments);

    this._ripple.destroy ();
  }
});
