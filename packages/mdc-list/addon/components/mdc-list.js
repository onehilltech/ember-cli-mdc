/* global mdc */

import Component from 'ember-cli-mdc-base/component';
import { action } from '@ember/object';

const { MDCList } = mdc.list;

export default class MdcListComponent extends Component {
  @action
  didInsert (element) {
    this._list = new MDCList (element);
    this._mdcComponentCreated (this._list);

    const { wrapFocus, singleSelection, vertical = true } = this.args;

    this._list.vertical = vertical
    this._list.singleSelection = singleSelection;
    this._list.wrapFocus = wrapFocus;
  }

  @action
  vertical (element, [vertical]) {
    this._list.vertical = vertical;
  }

  @action
  singleSelection (element, [singleSelection]) {
    this._list.singleSelection = singleSelection;
  }

  @action
  wrapFocus (element, [wrapFocus]) {
    this._list.wrapFocus = wrapFocus;
  }
}
