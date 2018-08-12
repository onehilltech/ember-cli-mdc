/* global mdc */

import layout from '../templates/components/mdc-textfield';
import TextField from '@ember/component/text-field';
import $ from 'jquery';

import { computed } from '@ember/object';
import { equal } from '@ember/object/computed';
import { isPresent } from '@ember/utils';

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

  _textField: null,

  $wrapper: null,

  $lineRipple: null,
  $outline: null,

  $label: null,

  didInsertElement () {
    this._super (...arguments);

    this.$ ().wrap ('<div class="mdc-text-field"></div>');
    this.$wrapper = this.$().parent ();

    const {isOutlined, isFullWidth} = this.getProperties (['isFullWidth', 'isOutlined']);

    if (!isFullWidth) {
      // Add the label component after the input html element.
      this.$label = $(`<label class="mdc-floating-label" for="${this.elementId}"></label>`);
      this.$label.insertAfter (this.$());
    }

    if (isOutlined) {
      this.$outline = $('<div class="mdc-notched-outline"><svg><path class="mdc-notched-outline__path"/></svg></div><div class="mdc-notched-outline__idle"></div>');
      this.$wrapper.append (this.$outline);
    }
    else {
      // Add the line ripple as the last element.
      this.$lineRipple = $('<div class="mdc-line-ripple"></div>');
      this.$wrapper.append (this.$lineRipple);
    }

    // Lastly, we can instantiate the text field component.
    this._textField = new mdc.textfield.MDCTextField (this.$wrapper[0]);
  },

  didRender () {
    this._super (...arguments);

    // The component has rendered. At this point in time, let's update the value of
    // the label if the value is not the same.
    const { styleClassName, dense, disabled } = this.getProperties (['styleClassName', 'dense', 'disabled']);

    this.$wrapper.toggleClass (styleClassName);
    this.$wrapper.toggleClass ('mdc-text-field--disabled', !!disabled);
    this.$wrapper.toggleClass ('mdc-text-field--dense', !!dense);

    if (!!this.$label) {
      const label = this.getWithDefault ('label', '');

      if (this.$label.text () !== label)
        this.$label.text (label);
    }
  },

  willDestroyElement () {
    this._super (...arguments);

    // Destroy the component.
    this._textField.destroy ();

    // Tear down the elements of the component we added.

    if (this.$lineRipple) {
      this.$lineRipple.remove ();
    }

    if (this.$outline) {
      this.$outline.remove ();
    }

    this.$label.remove ();

    // The final step is to remove the wrapper from the component.
    this.$().unwrap ();
  }
});
