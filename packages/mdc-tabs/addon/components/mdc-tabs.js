/* global mdc */

import Component from 'ember-cli-mdc-base/component';
import listener from 'ember-cli-mdc-base/listener';

import { isPresent } from '@ember/utils';
import { assert } from '@ember/debug';

function noOp () { }

const { MDCTabBar } = mdc.tabBar;

export default class MdcTabsComponent extends Component {
  /// The tab bar element for the tabs.
  _tabPanels = null;

  _currentActiveTab = undefined;

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
    let activeTab = this.activeTab;
    let tabs = element.querySelectorAll ('.mdc-tab');
    let tab;

    if (activeTab !== 0) {
      // We need to the active state from the default tab (i.e., tab 0).
      tab = tabs.item (0);

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
    let tabPanel = element.querySelectorAll ('.mdc-tab-panel').item (activeTab);
    tabPanel.classList.add ('mdc-tab-panel--active');

    this._currentActiveTab = activeTab;
  }

  @listener ('MDCTabBar:activated')
  activated (ev) {
    const { detail: { index } } = ev;

    // Activate the selected panel.
    this._activateTabPanel (index);

    // Send the appropriate notification.
    this.didActivate (ev);
    (this.args.activated || noOp) (index);
  }

  didActivate (ev) {

  }

  _activateTabPanel (index) {
    if (index === this._currentActiveTab) {
      return;
    }

    if (isPresent (this._currentActiveTab)) {
      this._tabPanels[this._currentActiveTab].classList.remove ('mdc-tab-panel--active');
    }

    this._tabPanels[index].classList.add ('mdc-tab-panel--active');
    this._currentActiveTab = index;
  }
}
