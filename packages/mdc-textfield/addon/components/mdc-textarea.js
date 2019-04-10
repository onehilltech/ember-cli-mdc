import Component from '@ember/component';
import layout from '../templates/components/mdc-textarea';

import { computed } from '@ember/object';
import { not } from '@ember/object/computed';

import { inject as service } from '@ember/service';

import TextSupport from '../mixins/text-support';

export default Component.extend (TextSupport, {
  layout,

  classNames: ['mdc-text-field--textarea'],
  classNameBindings: ['fullWidth:mdc-text-field--fullwidth'],

  fullWidth: false,
  notFullWidth: not ('fullWidth'),

  _defaultConfig: service ('mdc-textarea-configurator'),

  textAreaId: computed (function () {
    return `${this.elementId}-textarea`;
  }),

  // Reference to the floating label. There are cases where we need to manage
  // its state due to the possibility of the text fields value being dynamic
  // updated by some external source.
  _textarea: null,

  didUpdateAttrs () {
    this._super (...arguments);

    this._checkValue ();
  },

  didCreateComponent () {
    this._super (...arguments);

    this._textarea = this.element.querySelector ('textarea');
    this._checkValue ();
  },

  willDestroyComponent () {
    this._textarea = undefined;
  },

  _checkValue () {
    const value = this.get ('value');

    if (value !== undefined && value !== this._textarea.value) {
      // The value was changed by an external source, and not by the user actually typing
      // a new value. Let's manually update the text field value so the component can update
      // its state accordingly.

      this._textField.value = value;
    }
  }
});
