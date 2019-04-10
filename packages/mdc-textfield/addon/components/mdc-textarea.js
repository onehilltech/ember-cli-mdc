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

  didCreateComponent () {
    this._super (...arguments);

    this._textarea = this.element.querySelector ('textarea');
  },

  willDestroyComponent () {
    this._textarea = undefined;
  },

  _getNativeInput () {
    return this._textarea;
  }
});
