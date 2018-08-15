/* global mdc */

import layout from '../templates/components/mdc-textfield';
import Component from '@ember/component';

import TextSupport from '../mixins/text-support';

import { computed } from '@ember/object';
import { isPresent, isNone } from '@ember/utils';
import { or, readOnly, equal, not } from '@ember/object/computed';

export default Component.extend (TextSupport, {
  layout,

  tagName: 'div',

  classNameBindings: [
    'styleClassName',
    'iconClassName'
  ],

  label: null,
  style: null,
  helperText: null,
  disabled: false,
  dense: false,

  icon: null,
  iconPosition: null,
  iconClickable: false,
  iconClick: null,

  isOutlined: equal ('style', 'outlined'),
  isFullWidth: equal ('style', 'fullwidth'),
  notFullWidth: not ('isFullWidth'),

  styleClassName: computed ('style', function () {
    const style = this.get ('style');

    if (isNone (style)) {
      return null;
    }

    this.set ('_invalidate', true);
    return `mdc-text-field--${style}`;
  }),

  // Helper methods for the position.
  hasLeadingIcon: equal ('iconPosition', 'leading'),
  hasTrailingIcon: equal ('iconPosition', 'trailing'),

  iconClassName: computed ('iconPosition', function () {
    const { hasLeadingIcon, hasTrailingIcon } = this.getProperties (['hasLeadingIcon', 'hasTrailingIcon']);

    return hasLeadingIcon ? 'mdc-text-field--with-leading-icon' : (hasTrailingIcon ? 'mdc-text-field--with-trailing-icon' : null);
  }),

  inputId: computed (function () {
    return `${this.elementId}-input`;
  })
});
