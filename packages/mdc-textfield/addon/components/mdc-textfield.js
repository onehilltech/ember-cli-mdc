/* global mdc */

import layout from '../templates/components/mdc-textfield';
import Component from '@ember/component';

import { computed } from '@ember/object';
import { isPresent, isNone } from '@ember/utils';
import { or, readOnly, equal, not } from '@ember/object/computed';

export default Component.extend ({
  layout,

  tagName: 'div',

  classNames: ['mdc-text-field'],

  classNameBindings: [
    'styleClassName',
    'iconClassName',
    'dense:mdc-text-field--dense',
    'disabled:mdc-text-field--disabled'
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

  invalid: false,
  valid: not ('invalid'),

  styleClassName: computed ('style', function () {
    const style = this.get ('style');

    if (isNone (style)) {
      return null;
    }

    this.set ('invalidate', true);
    return `mdc-text-field--${style}`;
  }),

  _textField: null,
  _invalidate: false,

  // Helper methods for the position.
  hasLeadingIcon: equal ('iconPosition', 'leading'),
  hasTrailingIcon: equal ('iconPosition', 'trailing'),

  iconClassName: computed ('iconPosition', function () {
    const { hasLeadingIcon, hasTrailingIcon } = this.getProperties (['hasLeadingIcon', 'hasTrailingIcon']);

    return hasLeadingIcon ? 'mdc-text-field--with-leading-icon' : (hasTrailingIcon ? 'mdc-text-field--with-trailing-icon' : null);
  }),

  inputId: computed (function () {
    return `${this.elementId}-input`;
  }),

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

  didReceiveAttrs () {
    this._super (...arguments);
  },

  didRender () {
    this._super (...arguments);

    const valid = this.get ('valid');

    if (valid !== this._textField.valid) {
      this._textField.valid = valid;
    }
  },

  _createComponent () {
    this._textField = new mdc.textfield.MDCTextField (this.element);
    this._textField.listen ('MDCTextField:icon', this.doClickIcon.bind (this));
  },

  _destroyComponent () {
    this._textField.unlisten ('MDCTextField:icon', this.doClickIcon.bind (this));
    this._textField.destroy ();
    this._textField = null;
  }
});
