/* global mdc */

import Component from '@ember/component';
import layout from '../templates/components/mdc-icon-button-toggle';

import { computed } from '@ember/object';

const { MDCIconButtonToggle } = mdc.iconButton;

function noOp () {}

export default Component.extend ({
  layout,

  tagName: 'button',

  classNames: ['mdc-icon-button'],

  attributeBindings: [
    'label:aria-label'
  ],

  iconOn: computed ('params.[]', function () {
    return this.get ('params')[0];
  }),

  iconOff: computed ('params.[]', function () {
    return this.get ('params')[1];
  }),

  /// The current state of the toggle.
  on: false,

  /// Parent action for the toggle event.
  toggle: undefined,

  /// State for disabling the toggle button.
  disabled: false,

  /// The material design component.
  _iconToggleButton: null,
  _changeEventListener: null,

  init () {
    this._super (...arguments);

    this._changeEventListener = this.didChange.bind (this);
  },

  didInsertElement () {
    this._super (...arguments);

    // Set the attributes on the element.
    this.element.setAttribute ('aria-hidden', true);
    this.element.setAttribute ('aria-pressed', false);

    this._iconToggleButton = new MDCIconButtonToggle (this.element);

    // Initialize the on button, then set the listener. We do not want the listener
    // being called just for initializing the button.
    this._iconToggleButton.on = this.get ('on');
    this._iconToggleButton.listen ('MDCIconButtonToggle:change', this._changeEventListener);
  },

  didUpdate () {
    this._super (...arguments);

    const on = this.getWithDefault ('on', false);

    if (on !== this._iconToggleButton.on) {
      this._iconToggleButton.on = on;
    }
  },

  willDestroyElement () {
    this._super (...arguments);

    this._iconToggleButton.unlisten ('MDCIconButtonToggle:change', this._changeEventListener);
  },

  didChange ({detail: {isOn}}) {
    // Update the on state to reflect the changes, then notify the action that
    // there was a change in state.

    this.set ('on', isOn);
    this.getWithDefault ('toggle', noOp) (isOn);
  }
}).reopenClass ({
  positionalParams: 'params'
});
