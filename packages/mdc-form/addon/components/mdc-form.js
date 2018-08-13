import Component from '@ember/component';
import layout from '../templates/components/mdc-form';
import { Promise } from 'rsvp';

import { isPresent } from '@ember/utils';

function noOp () {

}

export default Component.extend({
  layout,

  tagName: 'form',

  classNames: ['mdc-form'],

  /// The submit action.
  submit: null,

  /// The inputs in the form.
  $inputs: null,
  $submit: null,

  didInsertElement () {
    this._super (...arguments);

    // Handle the submit event.

    this.$ (':submit').on ('click', this.doSubmit.bind (this));
  },

  didRender () {
    this._super (...arguments);

    // Make sure we stop listening.
    this._stopListening ();

    this.$submit = this.$ (':submit');
    this.$inputs = this.$ (':input:not(:button)');

    this.$submit.on ('click', this.doSubmit.bind (this));
    this.$inputs.on ('keypress', this._checkValidity.bind (this));

    // Let's check the validity of the form.
    this._checkValidity ();
  },

  willDestroyElement () {
    this._super (...arguments);
    this._stopListening ();
  },

  /**
   * Notification that the submit button was pressed.
   */
  doSubmit (ev) {
    // Prevent the default action from executing so we can handle the submission
    // process ourselves.
    ev.preventDefault ();

    // Check if there are any invalid inputs.
    const $invalid = this.$(':invalid');

    if ($invalid.length === 0) {
      // Let the subclass know we will submit the form.
      this.willSubmit ();

      Promise.resolve (this.getWithDefault ('submit', noOp) ()).then (() => {
        this.didSubmit ();
      });
    }
  },

  _stopListening () {
    if (isPresent (this.$submit)) {
      this.$submit.off ('click', this.doSubmit.bind (this));
    }

    if (isPresent (this.$inputs)) {
      this.$inputs.off ('keypress', this._checkValidity.bind (this));
    }
  },

  _checkValidity () {
    // Compute the validity state of the form, and notify the parent.
    const invalid = this.$inputs.filter ((i, input) => !input.validity.valid);
    const validity = this.getWithDefault ('validity', noOp);
    validity (invalid.length === 0);
  },

  /**
   * Notification that the form will be submitted.
   */
  willSubmit () {

  },

  /**
   * Notification that the form has been submitted.
   */
  didSubmit () {

  }
});
