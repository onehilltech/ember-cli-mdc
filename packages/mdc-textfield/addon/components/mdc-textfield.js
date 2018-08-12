/* global mdc */

import layout from '../templates/components/mdc-textfield';
import TextField from '@ember/component/text-field';
import $ from 'jquery';

import { computed } from '@ember/object';
import { equal } from '@ember/object/computed';
import { isPresent, isNone, isEmpty } from '@ember/utils';

export default TextField.extend ({
  layout,

  classNames: ['mdc-text-field__input'],

  attributeBindings: ['placeholder', 'label:aria-label'],

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

  icon: null,
  iconPosition: null,
  iconClickable: true,
  iconClick: null,

  _textField: null,

  $wrapper: null,
  $lineRipple: null,
  $outline: null,
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
    this.sendAction ('iconClick', ev);
  },

  willDestroyElement () {
    this._super (...arguments);

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
    this._insertLabel ();
    this._insertRippleOrOutline ();
    this._insertIcon ();
    this._insertHelperText ();

    // Lastly, we can instantiate the text field component.
    this._makeTextField ();
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

  /**
   * Insert the text field label.
   *
   * @private
   */
  _insertLabel () {
    const {isFullWidth, label, placeholder, value} = this.getProperties (['isFullWidth', 'label', 'placeholder', 'value']);

    if (isFullWidth) {
      // The text field is full width, which means the component does not have
      // a label. If one already exists, then we need to remove it.

      if (isPresent (this.$label)) {
        this.$label.remove ();
        this.$label = null;

        this.set ('_invalidated', true);
      }
    }
    else {
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
  },

  /**
   * Insert either a ripple or an outline depending on the selected style.
   *
   * @private
   */
  _insertRippleOrOutline () {
    const isOutlined = this.get ('isOutlined');

    if (isOutlined) {
      if (isPresent (this.$lineRipple)) {
        // The outline cannot be present if we are using the ripple style.
        this.$lineRipple.remove ();
        this.$lineRipple = null;

        this.set ('_invalidated', true);
      }

      if (isNone (this.$outline)) {
        this.$outline = $('<div class="mdc-notched-outline"><svg><path class="mdc-notched-outline__path"/></svg></div><div class="mdc-notched-outline__idle"></div>');
        this.$outline.insertAfter (this.$label || this.$ ());

        this.set ('_invalidated', true);
      }
    }
    else {
      if (isPresent (this.$outline)) {
        this.$outline.remove ();
        this.$outline = null;

        this.set ('_invalidated', true);
      }

      if (isNone (this.$lineRipple)) {
        this.$lineRipple = $('<div class="mdc-line-ripple"></div>');
        this.$wrapper.append (this.$label || this.$ ());

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
  _insertIcon () {
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
  _insertHelperText () {
    const helperText = this.get ('helperText');

    if (isPresent (helperText)) {
      const helperTextPersistent = this.getWithDefault ('helperTextPersistent', false);

      if (!this.$helperText) {
        // The text field does not have a helper text. We need to create one for the
        // component, and invalidate it.

        const helperTextId = this.get ('_helperTextId');

        this.$helperText = $(`<p id="${helperTextId}" class="mdc-text-field-helper-text" aria-hidden="true"></p>`);
        this.$helperText.insertAfter (this.$wrapper);
        this.element.setAttribute ('aria-controls', helperTextId);
        this.element.setAttribute ('aria-describedby', helperTextId);

        this.set ('_invalidated', true);
      }

      this.$helperText.toggleClass ('mdc-text-field-helper-text--persistent', helperTextPersistent);

      if (this.$helperText.text () !== helperText) {
        this.$helperText.text (helperText);
      }
    }
    else if (!!this.$helperText) {
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
