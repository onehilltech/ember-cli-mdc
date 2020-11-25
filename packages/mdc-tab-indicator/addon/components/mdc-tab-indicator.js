/* globals mdc */

import Component from 'ember-cli-mdc-base/component';
import { action } from '@ember/object';

const { MDCTabIndicator } = mdc.tabIndicator;

export default class MdcTabIndicatorComponent extends Component {
  @action
  didInsert (element) {
    let tabIndicator = new MDCTabIndicator (element);
    this._mdcComponentCreated (tabIndicator);
  }
}
