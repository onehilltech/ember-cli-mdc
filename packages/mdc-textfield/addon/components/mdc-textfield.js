import layout from '../templates/components/mdc-textfield';

import Component from '@ember/component';

import TextSupport from '../mixins/text-support';

import { computed } from '@ember/object';
import { isEmpty } from '@ember/utils';
import { equal, oneWay, or } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default Component.extend (TextSupport, {
  layout,

  _defaultConfig: service ('mdc-textfield-configurator'),

  tagName: 'div',

  classNameBindings: [
    'styleClassName',
    'leadingIcon:mdc-text-field--with-leading-icon',
    'trailingIcon:mdc-text-field--with-trailing-icon',
    'noLabel:mdc-text-field--no-label',
    'dense:mdc-text-field--dense'
  ],

  // Set the style for the text field. The default style comes from the configurator.
  // To change the style, just set this value when adding the component to handlebars.
  style: oneWay ('_defaultConfig.style'),

  label: null,
  helperText: null,
  disabled: false,

  isOutlined: equal ('style', 'outlined'),
  isFullWidth: equal ('style', 'fullwidth'),

  hasNotchedOutline: or ('isOutlined', 'isFullWidth'),

  styleClassName: computed ('style', function () {
    const style = this.get ('style');

    if (isEmpty (style) || style === 'standard') {
      return null;
    }

    return `mdc-text-field--${style}`;
  }),

  inputId: computed (function () {
    return `${this.elementId}-input`;
  }),

  // Reference to the floating label. There are cases where we need to manage
  // its state due to the possibility of the text fields value being dynamic
  // updated by some external source.
  _input: null,

  didCreateComponent () {
    this._super (...arguments);

    this._input = this.element.querySelector ('input');
  },

  willDestroyComponent () {
    this._input = undefined;
  },

  _getNativeInput () {
    return this._input;
  }
});
