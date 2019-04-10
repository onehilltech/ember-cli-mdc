import layout from '../templates/components/mdc-textfield';
import Component from '@ember/component';

import TextSupport from '../mixins/text-support';

import { computed } from '@ember/object';
import { isEmpty } from '@ember/utils';
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
  })
});
