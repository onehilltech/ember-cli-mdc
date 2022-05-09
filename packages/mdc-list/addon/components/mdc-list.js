/* global mdc */

import Component from 'ember-cli-mdc-base/component';
import { action } from '@ember/object';
import { A } from '@ember/array';
import { sort } from '@ember/object/computed';
import { isPresent } from '@ember/utils';

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

  get data () {
    return this.args.data || A ();
  }

  get sortDesc () {
    return this.args.sortDesc || A ();
  }

  @sort ('data', 'sortDesc')
  sorted;

  get limited () {
    const { limit } = this.args;
    const sorted = this.sorted;

    return isPresent (limit) ? sorted.slice (0, limit) : sorted;
  }
}
