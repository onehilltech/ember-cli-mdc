import Component from 'ember-cli-mdc-base/component';
import listener from 'ember-cli-mdc-base/listener';

import { action } from '@ember/object';
import { isNone } from '@ember/utils';

import { MDCTabBar } from '@material/tab-bar';

function noOp () {}


export default class MdcTabBarComponent extends Component {
  doPrepareElement (element) {
    const activeTab = element.querySelector ('.mdc-tab--active');

    if (isNone (activeTab)) {
      // The app bar is being initialized without a tab marked as active. We must
      // select the active tab as the initially selected tab.

      const activeTab = this.activeTab;
      const tab = element.querySelectorAll ('.mdc-tab')[activeTab];

      tab.classList.add ('mdc-tab--active');

      const tabIndicator = tab.querySelector ('.mdc-tab-indicator');
      tabIndicator.classList.add ('mdc-tab-indicator--active');

      // Let's send a notification that the initial tab is activated.
      this.notifyActivated (activeTab);
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
    const { detail: { index } } = ev;
    this.notifyActivated (index);
  }

  notifyActivated (index) {
    this.didActivate (index);
    this.dispatchEvent ('MdcTabBar:activated', { index })
  }

  didActivate (index) {

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
