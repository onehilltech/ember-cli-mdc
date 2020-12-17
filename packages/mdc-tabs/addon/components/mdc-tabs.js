/* global mdc */

import Component from 'ember-cli-mdc-base/component';
import listener from 'ember-cli-mdc-base/listener';

import { isPresent } from '@ember/utils';
import { assert } from '@ember/debug';
import { action } from '@ember/object';

function noOp () { }

const { MDCTabBar } = mdc.tabBar;

export default class MdcTabsComponent extends Component {
  /// The tab bar element for the tabs.
  _tabPanels = null;

  _currentActiveTab = 0;

  doPrepareElement (element) {
    let tabBarElement = element.querySelector ('.mdc-tab-bar');
    assert ('The mdc-tabs component must contain a mdc-tab-bar child element.', isPresent (tabBarElement));

    // Cache the tab panels.
    this._tabPanels = element.querySelectorAll ('.mdc-tab-panel');

    // Initialize the active tab.
    this._initActiveTab (element);
  }

  doCreateComponent (element) {
    return new MDCTabBar (element);
  }

  doInitComponent (component) {
    // Verify the number of tabs equals the number of panels.
    assert ('The number of mdc-tab elements must equal the number of mdc-tab-panel elements.', component.tabList_.length === this._tabPanels.length);
  }

  get activeTab () {
    return this.args.activeTab || 0;
  }

  _initActiveTab (element) {
    this._activateTab (element, this.activeTab);
  }

  @listener ('MDCTabBar:activated')
  activated (ev) {
    const { detail: { index } } = ev;

    // Activate the selected panel.
    this._activateTabPanel (index);
    this._currentActiveTab = index;

    // Send the appropriate notification.
    this.didActivate (ev);
    (this.args.activated || noOp) (index);
  }

  @action
  activateTab (element, [activeTab]) {
    this._activateTab (element, activeTab);
  }

  didActivate (ev) {

  }

  _activateTab (element, activeTab) {
    let tabs = element.querySelectorAll ('.mdc-tab');
    let tab;

    if (activeTab !== this._currentActiveTab) {
      // We need to the active state from the default tab (i.e., tab 0).
      tab = tabs.item (this._currentActiveTab);

      tab.classList.remove ('mdc-tab--active');
      tab.querySelector ('.mdc-tab-indicator').classList.remove ('mdc-tab-indicator--active');
    }

    // Add the active state to the tab.
    tab = tabs.item (activeTab);
    tab.classList.add ('mdc-tab--active');

    // Add the active state to the tab indicator.
    let tabIndicator = tab.querySelector ('.mdc-tab-indicator');
    tabIndicator.classList.add ('mdc-tab-indicator--active');

    // Add the active state to the tab panel.
    this._activateTabPanel (activeTab);

    // Save the active tab index.
    this._currentActiveTab = activeTab;
  }

  _activateTabPanel (index) {
    if (isPresent (this._currentActiveTab)) {
      this._tabPanels.item (this._currentActiveTab).classList.remove ('mdc-tab-panel--active');
    }

    this._tabPanels.item (index).classList.add ('mdc-tab-panel--active');
  }
}
