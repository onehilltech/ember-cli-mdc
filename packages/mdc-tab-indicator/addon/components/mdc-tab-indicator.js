/* globals mdc */

import Component from '@ember/component';
import layout from '../templates/components/mdc-tab-indicator';

export default Component.extend({
  tagName: 'span',

  layout,

  classNames: ['mdc-tab-indicator'],

  classNameBindings: [
    'active:mdc-tab-indicator--active',
    'fade:mdc-tab-indicator--fade',
  ],

  active: false,

  fade: false,

  _tabIndicator: null,

  didInsertElement () {
    this._super (...arguments);

    this._tabIndicator = new mdc.tabIndicator.MDCTabIndicator (this.element);
  },

  willDestroyElement () {
    this._super (...arguments);

    this._tabIndicator.destroy ();
  }
});
