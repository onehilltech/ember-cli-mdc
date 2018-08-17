/* global mdc */

import Mixin from '@ember/object/mixin';

export default Mixin.create ({
  classNames: ['mdc-form-field'],
  classNameBindings: ['alignEnd:mdc-form-field--align-end'],

  /// The mdc component.
  _formField: null,

  didInsertElement () {
    this._super (...arguments);

    this._formField = new mdc.formField.MDCFormField (this.element);
  },

  willDestroyElement () {
    this._super (...arguments);

    this._formField.destroy ();
  }
})