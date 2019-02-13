/* global mdc */

import Component from '@ember/component';
import layout from '../templates/components/mdc-switch';

const CLASSNAME_CHECKED = 'mdc-switch--checked';

export default Component.extend({
  layout,

  classNames: ['mdc-switch'],
  classNameBindings: ['disabled:mdc-switch--disabled'],

  disabled: false,

  _switch: null,

  didUpdate () {
    this._super (...arguments);

    // Make sure the state of the element matches the state of this component.
    const checked = this.checked;

    if (checked !== this.element.classList.contains (CLASSNAME_CHECKED)) {
      if (checked)
        this.element.classList.add (CLASSNAME_CHECKED);
      else
        this.element.classList.remove (CLASSNAME_CHECKED);
    }
  },

  didInsertElement () {
    this._super (...arguments);

    this._switch = new mdc.switch.MDCSwitch (this.element);
  },

  willDestroyElement () {
    this._super (...arguments);

    this._switch.destroy ();
  }
});
