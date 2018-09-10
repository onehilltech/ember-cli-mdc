/* global mdc */

import Component from '@ember/component';
import layout from '../templates/components/mdc-tab-bar';

import { isPresent, isNone } from '@ember/utils';
import Elevation from 'ember-cli-mdc-elevation/mixins/elevation';

function noOp () {}

export default Component.extend (Elevation, {
  layout,

  classNames: ['mdc-tab-bar'],

  /// Index of the active tab.
  activeTab: undefined,

  /// Scroll to a specific tab.
  scrollTo: undefined,

  _tabBar: null,

  didInsertElement () {
    this._super (...arguments);

    this.element.setAttribute ('role', 'tablist');

    const $activeTab = this.element.querySelector ('.mdc-tab--active');

    if (isNone ($activeTab)) {
      // The app bar is being initialized without a tab marked as active. We need
      // select the active tab as the initially selected tab.

      let activeTab = this.getWithDefault ('activeTab', 0);
      let $tab = this.element.querySelectorAll ('.mdc-tab')[activeTab];

      $tab.classList.add ('mdc-tab--active');

      let $tabIndicator = $tab.querySelector ('.mdc-tab-indicator');
      $tabIndicator.classList.add ('mdc-tab-indicator--active');
    }

    this._tabBar = new mdc.tabBar.MDCTabBar (this.element);
    this._tabBar.listen ('MDCTabBar:activated', this.didActivate.bind (this));
  },

  didUpdate () {
    this._super (...arguments);

    const activeTab = this.get ('activeTab');

    if (isPresent (activeTab)) {
      this._tabBar.activateTab (activeTab)
    }
  },

  willDestroyElement () {
    this._super (...arguments);

    this._tabBar.unlisten ('MDCTabBar:activated', this.didActivate.bind (this));
    this._tabBar.destroy ();
  },

  didActivate ({ detail: { index } }) {
    this.getWithDefault ('activate', noOp) (index);
  }
});
