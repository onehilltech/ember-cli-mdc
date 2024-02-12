import Component from 'ember-cli-mdc-base/component';

import { action } from '@ember/object';
import { equal } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { assert } from '@ember/debug';
import { tracked } from '@glimmer/tracking';
import { guidFor } from '@ember/object/internals';
import { isPresent } from '@ember/utils';

import { MDCTextField } from '@material/textfield';

const STYLES = ['filled', 'outlined'];

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

export default class MdcTextFieldComponent extends Component {
  @service ('mdc-textfield-configurator')
  configurator;

  @tracked
  labelId;

  @tracked
  helperId;

  inputElement;

  get style () {
    return this.args.style || this.configurator.style || 'filled';
  }

  get styleClassName () {
    let style = this.style;

    assert (`The textfield component supports the following styles: ${STYLES}`, STYLES.includes (style));

    return `mdc-text-field--${style}`;
  }

  doPrepareElement (element) {
    const { value } = this.args;

    if (isPresent (value)) {
      // Force the label to float since we are starting with a value.
      element.classList.add ('mdc-text-field--label-floating');

      const floatingLabel = element.querySelector ('.mdc-floating-label');

      if (isPresent (floatingLabel)) {
        floatingLabel.classList.add ('mdc-floating-label--float-above');
      }
    }

    this.inputElement = element.querySelector ('.mdc-text-field__input');
    this.labelId = guidFor (this);
    this.helperId = `${guidFor (this)}__helper-text`;
  }

  doCreateComponent (element) {
    return new MDCTextField (element);
  }

  @action
  didUpdateValue (element, [value = '']) {
    const component = this.component;

    if (isPresent (component)) {
      // Setting a null value actually causes the material component to fail. We are
      // going to replace the null value with an empty string.

      if (value === null) {
        value = '';
      }

      component.value = value;
    }
  }

  @equal ('style', 'filled')
  filled;

  @equal ('style', 'outlined')
  outlined;

  @tracked
  _count = 0;

  get count () {
    return this.args.count || this._count;
  }

  get max () {
    return this.args.max || 0;
  }

  get helperLine () {
    const { characterCount = false } = this.args;
    return isPresent (this.helperText) || characterCount;
  }

  get helperText () {
    return this.args.errorMessage || this.validationMessage || this.args.helperText;
  }

  get isValidationMessage () {
    return isPresent (this.validationMessage) || isPresent (this.args.errorMessage);
  }

  get isPersistentHelperText () {
    return this.isValidationMessage || isPresent (this.args.persistentHelperText);
  }

  @tracked
  validationMessage;

  @action
  focus () {
    this.validationMessage = null;
  }

  @tracked
  isFirstInput = true;

  @action
  input () {
    this.isFirstInput = false;
  }

  @action
  blur (ev) {
    this.validate (ev.target);
  }

  @action
  invalid (ev) {
    ev.preventDefault ();

    if (!this.isFirstInput) {
      this.validate (ev.target);
    }
  }

  /**
   * Validate the HTML input element.
   *
   * @param input
   */
  validate (input) {
    if (!input.validity.valid) {
      let { validationMessages } = this.args;

      if (isPresent (validationMessages)) {
        // The user wants to display a custom validation error message instead
        // of the default validation error message.

        for (let i = 0, len = VALIDATION_ERROR_TYPE.length; i < len; ++i) {
          const reason = VALIDATION_ERROR_TYPE[i];
          const failed = input.validity[reason];

          if (failed) {
            this.validationMessage = validationMessages[reason] || input.validationMessage;
            break;
          }
        }
      }
      else {
        // Set the default validation message.
        this.validationMessage = input.validationMessage;
      }
    }
  }

  @action
  setCustomErrorMessage (input, [errorMessage]) {
    input.setCustomValidity (isPresent (errorMessage) ? errorMessage : '');
    input.reportValidity ();
  }
}
