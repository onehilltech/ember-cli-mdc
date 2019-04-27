/* global mdc */

import Mixin from '@ember/object/mixin';

import { not } from '@ember/object/computed';
import { isPresent } from '@ember/utils';

export default Mixin.create ({
  classNames: ['mdc-text-field'],

  classNameBindings: [
    'dense:mdc-text-field--dense',
    'disabled:mdc-text-field--disabled'
  ],

  _textField: null,
  _invalidate: false,

  invalid: false,
  valid: not ('invalid'),

  _iconClickListener: null,

  init () {
    this._super (...arguments);

    this._iconClickListener = this.doClickIcon.bind (this);
  },

  didInsertElement () {
    this._super (...arguments);

    this._createComponent ();
  },

  didUpdate () {
    this._super (...arguments);

    if (this.get ('_invalidate')) {
      if (isPresent (this._textField)) {
        this._destroyComponent ();
      }

      this._createComponent ();
      this.set ('_invalidate', false);
    }
  },

  willDestroyElement () {
    this._super (...arguments);

    this._destroyComponent ();
  },

  doClickIcon () {
    const iconClick = this.getWithDefault ('iconClick');

    if (isPresent (iconClick)) {
      iconClick ();
    }
  },

  didRender () {
    this._super (...arguments);
    this._textField.valid = this.get ('valid');
  },

  didUpdateAttrs () {
    this._super (...arguments);

    this._checkValue ();
  },

  _createComponent () {
    this._textField = new mdc.textfield.MDCTextField (this.element);
    this._textField.listen ('MDCTextField:icon', this._iconClickListener);

    this.didCreateComponent ();

    // Check the value of the component against the native input.
    this._checkValue ();
  },

  didCreateComponent () {

  },

  _destroyComponent () {
    this.willDestroyComponent ();

    this._textField.unlisten ('MDCTextField:icon', this._iconClickListener);
    this._textField.destroy ();
    this._textField = null;
  },

  willDestroyComponent () {

  },

  _checkValue () {
    const value = this.get ('value');
    const input = this._getNativeInput ();

    if (document.activeElement !== input && value !== undefined && value !== input.value) {
      // The value was changed by an external source, and not by the user actually typing
      // a new value. Let's manually update the text field value so the component can update
      // its state accordingly.

      this._textField.value = value;
    }
  },

  _getNativeInput () {
    return undefined;
  }
});
