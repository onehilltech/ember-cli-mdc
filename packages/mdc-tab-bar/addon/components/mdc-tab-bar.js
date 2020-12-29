/* global mdc */

import Component from 'ember-cli-mdc-base/component';
import listener from 'ember-cli-mdc-base/listener';

import { action } from '@ember/object';
import { isNone } from '@ember/utils';

function noOp () {}

const { MDCTabBar } = mdc.tabBar;

export default class MdcTabBarComponent extends Component {
  doPrepareElement (element) {
    const activeTab = element.querySelector ('.mdc-tab--active');

    if (isNone (activeTab)) {
      // The app bar is being initialized without a tab marked as active. We need
      // select the active tab as the initially selected tab.

      let activeTab = this.activeTab;
      let tab = element.querySelectorAll ('.mdc-tab')[activeTab];

      tab.classList.add ('mdc-tab--active');

      let tabIndicator = tab.querySelector ('.mdc-tab-indicator');
      tabIndicator.classList.add ('mdc-tab-indicator--active');
    }
  }

  doCreateComponent (element) {
    return new MDCTabBar (element)
  }

  get activeTab () {
    return this.args.activeTab || 0;
  }

  @listener ('MDCTabBar:activated')
  activated (ev) {
    this.didActivate (ev);

    const { detail: { index } } = ev;
    (this.args.activated || noOp) (index);
  }

  didActivate (ev) {

  }

  @action
  activateTab (element, [index]) {
    this.component.activateTab (index)
  }

  @action
  scrollIntoView (element, [index]) {
    this.component.scrollIntoView (index);
  }
}
