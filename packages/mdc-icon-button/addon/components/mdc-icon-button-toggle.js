import Component from '@ember/component';
import layout from '../templates/components/mdc-icon-button-toggle';

import { computed } from '@ember/object';
import { isPresent } from '@ember/utils';

export default Component.extend({
  layout,

  tagName: 'button',

  classNames: ['mdc-icon-button', 'material-icons'],

  attributeBindings: [
    'disabled',
    'label:aria-label',
    'onContent:data-toggle-on-content',
    'onLabel:data-toggle-on-label',
    'onClass:data-toggle-on-class',
    'offContent:data-toggle-off-content',
    'offLabel:data-toggle-off-label',
    'offClass:data-toggle-off-class'
  ],

  /// State for disabling the toggle button.
  disabled: false,

  /// Toggle on content
  onContent: null,

  /// Toggle on label
  onLabel: null,

  /// Toggle off content
  offContent: null,

  /// Toggle off label
  offLabel: null,

  /// Manually set the toggle state.
  on: null,

  /// The material design component.
  _iconToggleButton: null,

  didInsertElement () {
    this._super (...arguments);

    this._iconToggleButton = new mdc.iconButton.MDCIconButtonToggle (this.element);
    this._iconToggleButton.listen ('MDCIconButtonToggle:change', this.didChange.bind (this));

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

    this._iconToggleButton.unlisten ('MDCIconButtonToggle:change', this.didChange.bind (this));
  },

  didChange (ev) {
    const { detail: {isOn}} = ev;

    this.sendAction ('change', isOn);
  }
});
