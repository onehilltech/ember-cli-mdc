/* global mdc */

import Mixin from '@ember/object/mixin';

import $ from 'jquery';

import { computed } from '@ember/object';
import { equal, not, or } from '@ember/object/computed';
import { isPresent, isNone, isEmpty } from '@ember/utils';

function noOp () { }

const VALIDATION_ERROR_TYPE = [
  'badInput',
  'patternMismatch',
  'rangeOverflow',
  'rangeUnderflow',
  'stepMismatch',
  'tooLong',
  'tooShort',
  'valueMissing',
  'typeMismatch',
];

export default Mixin.create ({
  classNames: ['mdc-text-field__input'],

  attributeBindings: ['label:aria-label'],

  label: null,

  /// Style of text field as dense.
  dense: false,

  /// Styles the text field as fullwidth, box, or outlined.
  style: null,

  styleClassName: computed ('style', function () {
    const style = this.get ('style');
    return isPresent (style) ? `mdc-text-field--${style}` : null;
  }),

  isFullWidth: equal ('style', 'fullwidth'),
  isOutlined: equal ('style', 'outlined'),

  placeholder: null,

  helperText: null,
  helperTextPersistent: false,

  _hasHelperText: or ('{helperText,required,min,max,pattern}'),

  icon: null,
  iconPosition: null,
  iconClickable: true,
  iconClick: null,

  _textField: null,

  $wrapper: null,
  $label: null,
  $helperText: null,
  $icon: null,

  /// The invalidated state of the component.
  _invalidated: true,

  _hasLeadingIcon: equal ('iconPosition', 'leading'),

  _hasTrailingIcon: equal ('iconPosition', 'trailing'),

  _iconClassName: computed ('iconPosition', function () {
    const {
      _hasLeadingIcon:hasLeadingIcon,
      _hasTrailingIcon:hasTrailingIcon
    } = this.getProperties (['iconPosition', '_hasLeadingIcon', '_hasTrailingIcon']);

    return hasLeadingIcon ? 'mdc-text-field--with-leading-icon' : (hasTrailingIcon ? 'mdc-text-field--with-trailing-icon' : null);
  }),

  didInsertElement () {
    this._super (...arguments);

    // Listen for when the input loses focus. This will allow us to display
    // custom error messages when the input is invalid.
    this.$ ().on ('blur', this.didBlur.bind (this));

    // The input must be wrapped in a text field container.
    this.$ ().wrap ('<div class="mdc-text-field"></div>');
    this.$wrapper = this.$().parent ();

    this._renderTextField ();
  },

  didUpdate () {
    this._super (...arguments);
    this._renderTextField ();
  },

  didRender () {
    this._super (...arguments);

    // The component has rendered. At this point in time, let's update the value of
    // the label if the value is not the same.
    const { styleClassName, dense, disabled } = this.getProperties (['styleClassName', 'dense', 'disabled']);

    this.$wrapper
      .removeClass ('mdc-text-field--outlined mdc-text-field--fullwidth mdc-text-field--box')
      .addClass (styleClassName);

    this.$wrapper.toggleClass ('mdc-text-field--disabled', !!disabled);
    this.$wrapper.toggleClass ('mdc-text-field--dense', !!dense);
  },

  didClickIcon (ev) {
    const iconClick = this.get ('iconClick');

    if (isPresent (iconClick)) {
      iconClick (ev);
    }
  },

  /**
   * The input has lost focus.
   */
  didBlur () {
    // Update the valid state of the text field.
    this._textField.valid = this.element.validity.valid;

    if (this.element.validity.valid) {
      // Since the input is valid, let's make sure there is no validation message
      // class on the helper text input.
      if (this.$helperText.hasClass ('mdc-text-field-helper-text--validation-msg')) {
        this.$helperText.removeClass ('mdc-text-field-helper-text--validation-msg');
      }

      // Restore the original helper text.
      const helperText = this.get ('helperText');

      if (isPresent (helperText)) {
        this._textField.helperTextContent = helperText;
      }

      // Let the parent know the input is valid.
      this.getWithDefault ('valid', noOp) ();
    }
    else {
      const validationMessages = this.get ('validationMessages');

      if (isPresent (validationMessages)) {
        // The user wants to display a custom validation error message instead
        // of the default validation error message.

        for (let i = 0, len = VALIDATION_ERROR_TYPE.length; i < len; ++i) {
          const reason = VALIDATION_ERROR_TYPE[i];
          const failed = this.element.validity[reason];

          if (failed) {
            const errorMessage = isPresent (validationMessages[reason]) ? validationMessages[reason] : this.element.validationMessage;
            this._setErrorMessage (errorMessage);

            break;
          }
        }
      }
      else {
        // Show the default validation message.
        this._setErrorMessage (this.element.validationMessage);
      }

      // Let the parent know the input is invalid.
      this.getWithDefault ('invalid', noOp) ();
    }
  },
  
  _setErrorMessage (message) {
    if (this._textField.valid) {
      this._textField.valid = false;
    }

    this._textField.helperTextContent = message;

    this.$helperText.toggleClass ('mdc-text-field-helper-text--persistent', true);
    this.$helperText.toggleClass ('mdc-text-field-helper-text--validation-msg', true);
  },

  /**
   * The component will be destroyed.
   */
  willDestroyElement () {
    this._super (...arguments);

    this.$ ().off ('blur', this.didBlur.bind (this));

    this._destroyTextField ();
    this._removeInsertedElements ();

    // The final step is to remove the wrapper from the component.
    this.$().unwrap ();
  },

  /**
   * Render the elements of the text field.
   *
   * @private
   */
  _renderTextField () {
    this._renderLabel ();
    this._applyStyling ();
    this._renderIcon ();
    this._renderHelperText ();

    // Lastly, we can instantiate the text field component.
    this._makeTextField ();
  },

  _applyStyling () {

  },

  /**
   * Make the text field component.
   *
   * @private
   */
  _makeTextField () {
    if (!this.get ('_invalidated')) {
      return;
    }

    if (isPresent (this._textField)) {
      this._destroyTextField ();
    }

    // Let's create a new text field component.
    this._textField = new mdc.textfield.MDCTextField (this.$wrapper[0]);
    this._textField.listen ('MDCTextField:icon', this.didClickIcon.bind (this));

    // Reset the invalidated flag.
    this.set ('_invalidated', false);
  },

  /**
   * Remove the dynamically inserted elements.
   * @private
   */
  _removeInsertedElements () {
    if (isPresent (this.$icon)) {
      this.$icon.remove ();
    }

    if (isPresent (this.$lineRipple)) {
      this.$lineRipple.remove ();
    }

    if (isPresent (this.$outline)) {
      this.$outline.remove ();
    }

    if (isPresent (this.$helperText)) {
      this.$helperText.remove ();
    }

    if (isPresent (this.$label)) {
      this.$label.remove ();
    }
  },

  _destroyTextField () {
    this._textField.unlisten ('MDCTextField:icon', this.didClickIcon.bind (this));
    this._textField = null;
  },

  _hasLabel: not ('isFullWidth'),

  /**
   * Insert the text field label.
   *
   * @private
   */
  _renderLabel () {
    const {_hasLabel:hasLabel, label, placeholder, value} = this.getProperties (['_hasLabel', 'label', 'placeholder', 'value']);

    if (hasLabel) {
      // Text fields that are not full width do not support the placeholder attribute
      // in the input element.
      if (this.element.hasAttribute ('placeholder')) {
        this.element.removeAttribute ('placeholder');
      }

      // Add the label component after the input html element. Labels, however, are
      // not supported in full with text fields.

      if (isPresent (label)) {
        if (isNone (this.$label)) {
          this.$label = $(`<label class="mdc-floating-label" for="${this.elementId}"></label>`);
          this.$label.insertAfter (this.$());

          this.set ('_invalidated', true);
        }

        if (isPresent (placeholder) && isEmpty (value)) {
          this.$label.addClass ('mdc-floating-label--float-above');
          this.$wrapper.addClass ('mdc-text-field--upgraded');
        }

        if (this.$label.text () !== label) {
          this.$label.text (label);
        }
      }
      else {
        // The label does not exist anymore.
        this.$label.remove ();
        this.$label = null;

        this.set ('_invalidated', true);
      }
    }
    else {
      // The text field is full width, which means the component does not have
      // a label. If one already exists, then we need to remove it.

      if (isPresent (label)) {
        this.element.setAttribute ('placeholder', label);
      }

      if (isPresent (this.$label)) {
        this.$label.remove ();
        this.$label = null;

        this.set ('_invalidated', true);
      }
    }
  },

  /**
   * Insert the leading/trailing icon into the text field. If the text field is changing
   * states, then it will invalidate the component so it can recreate itself.
   *
   * @private
   */
  _renderIcon () {
    const {
      icon,
      iconClickable,
      _hasLeadingIcon:hasLeadingIcon,
      _hasTrailingIcon:hasTrailingIcon,
      _iconClassName:iconClassName
    } = this.getProperties (['icon', 'iconClickable', 'iconPosition', '_iconClassName', '_hasTrailingIcon', '_hasLeadingIcon']);

    if (isPresent (icon)) {
      // First, check if the current icon that exists is the same kind as the one
      // we are about the create. For example, check if we already have a leading
      // icon when creating a leading icon, or a trailing icon when we are creating
      // a trailing icon.

      if (isPresent (this.$icon) && !this._hasIconClassName (iconClassName)) {
        this.$icon.remove ();
        this.$icon = null;

        this.set ('_invalidated', true);
      }

      if (hasLeadingIcon) {
        if (!this.$icon) {
          // The leading icon goes before the input control.
          this.$icon = $(`<i class="material-icons mdc-text-field__icon"></i>`);
          this.$icon.insertBefore (this.$());

          // The component is invalidated because we are changing its structure.
          this.set ('_invalidated', true);
        }
      }
      else if (hasTrailingIcon) {
        if (!this.$icon) {
          // The trailing icon goes after either the label or the input control.
          this.$icon = $(`<i class="material-icons mdc-text-field__icon"></i>`);
          this.$icon.insertBefore (this.$label  || this.$());

          // The component is invalidated because we are changing its structure.
          this.set ('_invalidated', true);
        }
      }
      else {
        // we should fail here!!
      }

      this._setIcon (this.$icon, icon);
      this._makeIconClickable (this.$icon, iconClickable);
      this._setIconClassName (iconClassName);
    }
    else if (isPresent (this.$icon)) {
      // There is no more leading icon. We need to delete the icon from the
      // component and force the component to refresh create itself.
      this.$icon.remove ();
      this.$icon = null;

      this.set ('_invalidated', true);
    }
  },

  /**
   * Insert the helper text for the text field.
   *
   * @private
   */
  _renderHelperText () {
    const hasHelperText = this.get ('_hasHelperText');

    if (isPresent (hasHelperText)) {
      const helperTextPersistent = this.getWithDefault ('helperTextPersistent', false);

      if (!this.$helperText) {
        // The text field does not have a helper text. We need to create one for the
        // component, and invalidate it.

        const helperTextId = this.get ('_helperTextId');

        this.$helperText = $(`<p id="${helperTextId}" class="mdc-text-field-helper-text " aria-hidden="true"></p>`);
        this.$helperText.insertAfter (this.$wrapper);
        this.element.setAttribute ('aria-controls', helperTextId);
        this.element.setAttribute ('aria-describedby', helperTextId);

        this.set ('_invalidated', true);
      }

      this.$helperText.toggleClass ('mdc-text-field-helper-text--persistent', helperTextPersistent);

      const helperText = this.getWithDefault ('helperText', '');

      if (this.$helperText.text () !== helperText) {
        this.$helperText.text (helperText);
      }
    }
    else if (isPresent (this.$helperText)) {
      // Let's remove the helper text.
      this.$helperText.remove ();
      this.$helperText = null;

      this.set ('_invalidated', true);
    }
  },

  _helperTextId: computed ('elementId', function () {
    return `${this.elementId}-helper-text`;
  }),

  /**
   * Set the icon class name on the wrapper element.
   *
   * @param iconClassName
   * @private
   */
  _setIconClassName (iconClassName) {
    if (!this.$wrapper.hasClass (iconClassName)) {
      this.$wrapper.addClass (iconClassName);
    }
  },

  _hasIconClassName (iconClassName) {
    return this.$wrapper.hasClass (iconClassName);
  },

  /**
   * Set the text field icon.
   *
   * @param $icon
   * @param icon
   * @private
   */
  _setIcon ($icon, icon) {
    if ($icon.text () !== icon) {
      $icon.text (icon);
    }
  },

  /**
   * Make a text field icon clickable.
   *
   * @param $icon
   * @param clickable
   * @private
   */
  _makeIconClickable ($icon, clickable) {
    if (clickable) {
      $icon.attr ('tabindex', 0);
      $icon.attr ('role', 'button');
    }
    else {
      $icon.removeAttr ('tabindex');
      $icon.removeAttr ('role');
    }
  }
});
