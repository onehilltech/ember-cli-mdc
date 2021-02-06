/* global mdc */

import Component from 'ember-cli-mdc-base/component';
import { action } from '@ember/object';

const { MDCList } = mdc.list;

export default class MdcListComponent extends Component {
  doCreateComponent (element) {
    return new MDCList (element);
  }

  doInitComponent (component) {
    const { wrapFocus, singleSelection, vertical = true } = this.args;

    component.vertical = vertical
    component.singleSelection = singleSelection;
    component.wrapFocus = wrapFocus;
  }

  @action
  vertical (element, [vertical]) {
    this.component.vertical = vertical;
  }

  @action
  singleSelection (element, [singleSelection]) {
    this.component.singleSelection = singleSelection;
  }

  @action
  wrapFocus (element, [wrapFocus]) {
    this.component.wrapFocus = wrapFocus;
  }

  get interactive () {
    const { interactive = true } = this.args;
    return interactive;
  }
}
