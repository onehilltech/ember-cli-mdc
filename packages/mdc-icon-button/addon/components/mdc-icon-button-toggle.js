import Component from '@ember/component';
import layout from '../templates/components/mdc-icon-button-toggle';

import { computed } from '@ember/object';
import { isPresent } from '@ember/utils';

function noOp () {}

export default Component.extend({
  layout,

  tagName: 'button',

  classNames: ['mdc-icon-button'],

  attributeBindings: [
    'disabled',
    'label:aria-label'
  ],

  /// State for disabling the toggle button.
  disabled: false,

  iconOn: computed ('params.[]', function () {
    return this.get ('params')[0];
  }),

  iconOff: computed ('params.[]', function () {
    return this.get ('params')[1];
  }),

  /// Manually set the toggle state.
  on: null,

  /// Parent action for the toggle event.
  toggle: undefined,

  /// The material design component.
  _iconToggleButton: null,
  _changeEventListener: null,

  init () {
    this._super (...arguments);

    this._changeEventListener = this.didChange.bind (this);
  },

  didInsertElement () {
    this._super (...arguments);

    this._iconToggleButton = new mdc.iconButton.MDCIconButtonToggle (this.element);
    this._iconToggleButton.listen ('MDCIconButtonToggle:change', this._changeEventListener);

    this.element.setAttribute ('aria-hidden', true);
    this.element.setAttribute ('aria-pressed', false);
  },

  didRender () {
    this._super (...arguments);

    const on = this.get ('on');

    if (isPresent (on)) {
      this._iconToggleButton.on = on;
    }
  },

  willDestroyElement () {
    this._super (...arguments);

    this._iconToggleButton.unlisten ('MDCIconButtonToggle:change', this._changeEventListener);
  },

  didChange (ev) {
    const { detail: {isOn}} = ev;
    this.getWithDefault ('toggle', noOp) (isOn);
  }
}).reopenClass ({
  positionalParams: 'params'
});
