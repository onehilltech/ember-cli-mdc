import Component from '@ember/component';
import layout from '../templates/components/mdc-form';

import { isPresent } from '@ember/utils';

function noOp () {

}

export default Component.extend({
  layout,

  tagName: 'form',

  classNames: ['mdc-form'],

  /// The inputs in the form.
  $inputs: null,

  didRender () {
    this._super (...arguments);

    // Make sure we stop listening.
    this._stopListening ();

    this.$inputs = this.$ (':input:not(:button)');
    this.$inputs.on ('keypress', this._checkValidity.bind (this));

    // Let's check the validity of the form.
    this._checkValidity ();
  },

  willDestroyElement () {
    this._super (...arguments);
    this._stopListening ();
  },

  _stopListening () {
    if (isPresent (this.$inputs)) {
      this.$inputs.off ('keypress', this._checkValidity.bind (this));
    }
  },

  _checkValidity () {
    // Compute the validity state of the form, and notify the parent.
    const invalid = this.$inputs.filter ((i, input) => !input.validity.valid);
    const valid = this.getWithDefault ('valid', noOp);
    valid (invalid.length === 0);
  }
});
