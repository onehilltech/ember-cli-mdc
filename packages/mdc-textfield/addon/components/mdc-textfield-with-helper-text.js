import Component from '@ember/component';
import layout from '../templates/components/mdc-textfield-with-helper-text';

import { computed } from '@ember/object';
import { not, or, bool } from '@ember/object/computed';
import { isPresent, isEmpty } from '@ember/utils';

const VALIDATION_ERROR_TYPE = [
  'badInput',
  'patternMismatch',
  'rangeOverflow',
  'rangeUnderflow',
  'stepMismatch',
  'tooLong',
  'tooShort',
  'valueMissing',
  'typeMismatch',
];

export default Component.extend({
  layout,

  classNames: ['mdc-text-field-with-helper-text'],

  // {{mdc-textfield}}
  label: null,
  style: null,
  disabled: false,
  dense: false,

  icon: null,
  iconPosition: null,
  iconClickable: false,
  iconClick: null,

  // {{mdc-textfield-helper-text}}
  helperText: null,
  helperTextPersistent: false,

  /// Custom validation messages for invalid inputs.
  validationMessages: null,

  /// The custom validation message.
  validationMessage: null,

  /// The custom error message.
  errorMessage: null,

  /// The input control.
  _input: null,

  helperTextId: computed (function () {
    return `${this.elementId}-helper-text`;
  }),

  didInsertElement () {
    this._super (...arguments);

    this._input = this.$('.mdc-text-field__input')[0];

    const helperTextId = this.get ('helperTextId');
    this._input.setAttribute ('aria-controls', helperTextId);
    this._input.setAttribute ('aria-describedby', helperTextId);
    this._input.addEventListener ('blur', this.didBlur.bind (this));
  },

  willDestroyElement () {
    this._super (...arguments);

    this._input.removeEventListener ('blur', this.didBlur.bind (this));
  },

  didBlur () {
    let validationMessage = null;

    if (!this._input.validity.valid) {
      const validationMessages = this.get ('validationMessages');

      if (isPresent (validationMessages)) {
        // The user wants to display a custom validation error message instead
        // of the default validation error message.

        for (let i = 0, len = VALIDATION_ERROR_TYPE.length; i < len; ++i) {
          const reason = VALIDATION_ERROR_TYPE[i];
          const failed = this._input.validity[reason];

          if (failed) {
            validationMessage = validationMessages[reason];

            if (isEmpty (validationMessage)) {
              validationMessage = this._input.validationMessage;
            }

            break;
          }
        }
      }
      else {
        // Set the default validation message.
        validationMessage = this._input.validationMessage;
      }
    }

    this.setProperties ({ validationMessage, errorMessage: null });
  },

  persistMessage: or ('{helperTextPersistent,validationMessage,errorMessage}'),
  validation: or ('{validationMessage,errorMessage}'),
  message: or ('{errorMessage,validationMessage,helperText}')
});
