import Component from '@ember/component';
import layout from '../templates/components/mdc-password-textfield';

import { A } from '@ember/array';
import { isEmpty, isPresent } from '@ember/utils';

function noOp () {}

export default Component.extend({
  layout,

  classNames: ['mdc-text-field--password'],

  showPassword: false,

  iconOn: 'visibility',
  iconOff: 'visibility_off',

  /// The last value of the password.
  _lastValue: null,
  _input: null,

  init () {
    this._super (...arguments);

    this._onInputListener = this._onInput.bind (this);
  },

  didUpdateAttrs () {
    this._super (...arguments);

    // This handles the case where the value is changed externally to the component.
    this._checkPasswordValidity ();
  },

  didInsertElement () {
    this._super (...arguments);

    // Listen for changes to the input. We cannot use the 'value' attribute since the value
    // of the input is not changed externally to the component.
    this._input = this.element.querySelector ('input');
    this._input.addEventListener ('input', this._onInputListener);

    if (isPresent (this._input.value)) {
      this._checkPasswordValidity ();
    }
  },

  willDestroyElement () {
    this._super (...arguments);

    this._input.removeEventListener ('input', this._onInputListener);
  },

  _onInputListener: null,

  _onInput () {
    this._checkPasswordValidity ();
  },

  /**
   * Check the validity of the password, and notify the parent.
   */
  _checkPasswordValidity () {
    const value = this._input.value;

    if (value !== this._lastValue) {
      // Update the value so that we can prevent this check from happening multiple times
      // during the same update frame.
      this._lastValue = value;

      // Get the reasons the password is not valid.
      const {requirements = [], checked = noOp} = this.getProperties (['requirements', 'checked']);
      const reasons = isEmpty (requirements) ? null : A (requirements.filter (req => value.match (req.pattern) === null));

      // Send a notification about the passwords validity, and then update the valid state.
      const valid = isEmpty (reasons);
      checked ({valid, reasons});

      this.set ('valid', valid);
    }
  },

  actions: {
    toggle () {
      this.toggleProperty ('showPassword');
    }
  }
});
