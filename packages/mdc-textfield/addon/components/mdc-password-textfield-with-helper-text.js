import Component from '@ember/component';
import layout from '../templates/components/mdc-password-textfield-with-helper-text';

import HelperTextSupport from '../mixins/helper-text-support';

import { computed } from '@ember/object';
import { isEmpty } from '@ember/utils';
import { empty, not, readOnly, or } from '@ember/object/computed';

import { A } from '@ember/array';

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
    return isEmpty (value) || isEmpty (requirements) ? null : A (requirements.filter (req => value.match (req.pattern) === null));
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
