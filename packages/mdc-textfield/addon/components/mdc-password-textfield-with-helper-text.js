import Component from '@ember/component';
import layout from '../templates/components/mdc-password-textfield-with-helper-text';

import HelperTextSupport from '../mixins/helper-text-support';

import { computed } from '@ember/object';
import { readOnly, or } from '@ember/object/computed';

function noOp () {}

export default Component.extend (HelperTextSupport, {
  layout,

  classNames: ['mdc-text-field--password'],

  // List of failed password requirements.
  failed: null,
  firstFailed: readOnly ('failed.firstObject'),
  firstFailedErrorMessage: readOnly ('firstFailed.description'),

  passwordErrorMessage: null,

  errorMessage: or ('passwordErrorMessage', 'firstFailedErrorMessage'),

  actions: {
    validity (value) {
      this.set ('failed', value.reasons);

      // Bubble the event to the parent.
      this.getWithDefault ('password.validity', noOp) (value);
    }
  }
});
