import layout from '../templates/components/mdc-textfield';

import Component from '@ember/component';

import TextSupport from '../mixins/text-support';

import { computed } from '@ember/object';
import { isEmpty, isPresent } from '@ember/utils';
import { equal, and, oneWay, or } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default Component.extend (TextSupport, {
  layout,

  _defaultConfig: service ('mdc-textfield-configurator'),

  tagName: 'div',

  classNameBindings: [
    'styleClassName',
    'iconClassName'
  ],

  // Set the style for the text field. The default style comes from the configurator.
  // To change the style, just set this value when adding the component to handlebars.
  style: oneWay ('_defaultConfig.style'),

  label: null,
  helperText: null,
  disabled: false,

  icon: null,
  iconPosition: null,
  iconClickable: false,
  iconClick: null,

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

  // Helper methods for the position.

  leadingIcon: equal ('iconPosition', 'leading'),
  hasLeadingIcon: and ('icon', 'leadingIcon'),

  trailingIcon: equal ('iconPosition', 'trailing'),
  hasTrailingIcon: and ('icon', 'trailingIcon'),

  iconClassName: computed ('iconPosition', function () {
    const { trailingIcon, leadingIcon } = this.getProperties (['trailingIcon', 'leadingIcon']);

    return leadingIcon ? 'mdc-text-field--with-leading-icon' : (trailingIcon ? 'mdc-text-field--with-trailing-icon' : null);
  }),

  inputId: computed (function () {
    return `${this.elementId}-input`;
  }),

  // Reference to the floating label. There are cases where we need to manage
  // its state due to the possibility of the text fields value being dynamic
  // updated by some external source.
  _input: null,

  didUpdateAttrs () {
    this._super (...arguments);

    this._checkValue ();
  },

  didCreateComponent () {
    this._super (...arguments);

    this._input = this.element.querySelector ('input');
    this._checkValue ();
  },

  willDestroyComponent () {
    this._input = undefined;
  },

  _checkValue () {
    const value = this.get ('value');

    if (value !== undefined && value !== this._input.value) {
      // The value was changed by an external source, and not by the user actually typing
      // a new value. Let's manually update the text field value so the component can update
      // its state accordingly.

      this._textField.value = value;
    }
  }
});
