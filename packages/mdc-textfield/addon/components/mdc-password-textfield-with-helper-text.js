import Component from '@ember/component';
import layout from '../templates/components/mdc-password-textfield-with-helper-text';

import HelperTextSupport from '../mixins/helper-text-support';

import { computed } from '@ember/object';
import { isEmpty } from '@ember/utils';
import { empty, not, readOnly, or } from '@ember/object/computed';

import { A } from '@ember/array';

function noOp () {}

export default Component.extend (HelperTextSupport, {
  layout,

  classNames: ['mdc-text-field--password'],

  showPassword: false,

  iconOn: 'visibility',

  iconOff: 'visibility_off',

  // A collection of requirements for the password.
  passwordRequirements: null,

  // Get the first requirement that fails the password.
  failedPasswordRequirements: computed ('value', 'passwordRequirements.[]', function () {
    const { value, passwordRequirements: requirements } = this.getProperties (['value','passwordRequirements']);
    const invalid = isEmpty (value) || isEmpty (requirements) ? false : A (requirements.filter (req => value.match (req.pattern) === null));

    // Send a notification to the parent about the password's validity.
    this.getWithDefault ('validity') (invalid.length === 0);

    return invalid;
  }),

  meetsPasswordRequirements: empty ('failedPasswordRequirements'),

  invalidPassword: not ('meetsPasswordRequirements'),

  firstFailedPasswordRequirement: readOnly ('failedPasswordRequirements.firstObject'),

  passwordRequirementsErrorMessage: readOnly ('firstFailedPasswordRequirement.description'),

  passwordErrorMessage: null,

  errorMessage: or ('passwordErrorMessage', 'passwordRequirementsErrorMessage'),

  actions: {
    toggle () {
      this.toggleProperty ('showPassword');
    }
  }
});
