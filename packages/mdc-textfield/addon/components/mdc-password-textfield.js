import Component from '@ember/component';
import layout from '../templates/components/mdc-password-textfield';

import { A } from '@ember/array';
import { getWithDefault } from '@ember/object';
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

    this._onKeyUpListener = this._onKeyUp.bind (this);
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
    this._input.addEventListener ('keyup', this._onKeyUpListener);

    if (isPresent (this._input.value)) {
      this._checkPasswordValidity ();
    }
  },

  willDestroyElement () {
    this._super (...arguments);

    this._input.removeEventListener ('keyup', this._onKeyUpListener);
  },

  _onKeyUpListener: null,

  _onKeyUp () {
    this._checkPasswordValidity ();
  },

  /**
   * Check the validity of the password, and notify the parent.
   */
  _checkPasswordValidity () {
    if (this._input.value === this._lastValue) {
      return;
    }

    const value = this._input.value;
    const { password = {}} = this.getProperties (['password']);
    const requirements = getWithDefault (password, 'requirements', []);
    const validity = getWithDefault (password, 'validity', noOp);

    const reasons = isEmpty (requirements) ? null : A (requirements.filter (req => value.match (req.pattern) === null));

    // Send a notification to the parent about the password's validity.
    const valid = {value: isEmpty (reasons), reasons};
    validity (valid);

    // Cache the current value as the last value to prevent this method from being called
    // many times when the attributes update.
    this._lastValue = value;
  },

  actions: {
    toggle () {
      this.toggleProperty ('showPassword');
    }
  }
});
