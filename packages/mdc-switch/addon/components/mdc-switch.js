/* global mdc */

import Component from '@ember/component';
import layout from '../templates/components/mdc-switch';

export default Component.extend({
  layout,

  classNames: ['mdc-switch'],
  classNameBindings: ['disabled:mdc-switch--disabled'],

  disabled: false,

  _switch: null,

  didInsertElement () {
    this._super (...arguments);

    this._switch = new mdc.switch.MDCSwitch (this.element);
  },

  willDestroyElement () {
    this._super (...arguments);

    this._switch.destroy ();
  }
});
