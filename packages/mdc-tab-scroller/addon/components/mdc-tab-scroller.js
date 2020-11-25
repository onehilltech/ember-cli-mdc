/* global mdc */

import Component from 'ember-cli-mdc-base/component';
import { action } from '@ember/object';
import { assert } from '@ember/debug';
import { isEmpty } from '@ember/utils';

const ALIGN_VALUES = [
  'start',
  'center',
  'end'
];

const { MDCTabScroller } = mdc.tabScroller;

export default class MdcTabScrollerComponent extends Component {
  @action
  didInsert (element) {
    let tabScroller = new MDCTabScroller (element);
    this._mdcComponentCreated (tabScroller);
  }

  get align () {
    let { align } = this.args;

    if (isEmpty (align)) {
      return;
    }

    assert (`The align attribute must be one of the following values: ${ALIGN_VALUES}`, ALIGN_VALUES.includes (align));

    return `mdc-tab-scroller--align-${align}`;
  }
}
