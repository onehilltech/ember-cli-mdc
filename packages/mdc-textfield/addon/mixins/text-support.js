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

  _createComponent () {
    this._textField = new mdc.textfield.MDCTextField (this.element);
    this._textField.listen ('MDCTextField:icon', this.doClickIcon.bind (this));

    this.didCreateComponent ();
  },

  didCreateComponent () {

  },

  _destroyComponent () {
    this.willDestroyComponent ();

    this._textField.unlisten ('MDCTextField:icon', this.doClickIcon.bind (this));
    this._textField.destroy ();
    this._textField = null;
  },

  willDestroyComponent () {

  }
});
