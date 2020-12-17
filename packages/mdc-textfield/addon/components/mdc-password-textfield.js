import Component from '@glimmer/component';

import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

function noOp () {}

export default class MdcPasswordTextfieldComponent extends Component {
  @tracked
  showPassword = false;

  get visibleIcon () {
    return this.args.visibleIcon || 'visibility';
  }

  get invisibleIcon () {
    return this.args.invisibleIcon || 'visibility_off';
  }

  @action
  toggle () {
    this.showPassword = !this.showPassword;
  }

  /*
  /// The last value of the password.
  _lastValue: null,
  _input: null,

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
    else {
      this._lastValue = this._input.value;
    }
  },

  _onInputListener: null,

  @action
  input (element) {
    this._checkPasswordValidity ();
  }

  _checkPasswordValidity () {
    const value = this._input.value;

    if (value !== this._lastValue) {
      // Update the value so that we can prevent this check from happening multiple times
      // during the same update frame.
      this._lastValue = value;

      // Get the reasons the password is not valid.
      const {requirements = [], checked = noOp} = this;

      const reasons = isEmpty (requirements) ? null : A (requirements.map (req => {
        // Set the value on the object. We are using the 'set' method just in case the requirements is
        // an EmberObject. This will allow the requirement to update it state.
        set (req, 'passed', req.pattern.test (value));

        // Return the requirement.
        return req;
      }).filter (req => !req.passed));

      // Send a notification about the passwords validity, and then update the valid state.
      const valid = isEmpty (reasons);
      checked ({valid, reasons});

      this.set ('valid', valid);
    }
  },

*/

}
