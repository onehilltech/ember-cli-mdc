/* global mdc */

import Component from 'ember-cli-mdc-base/component';
import { action } from '@ember/object';
import { MDCList } from '@material/list';
import { isPresent, isNone } from '@ember/utils';
import { assert } from '@ember/debug';

const LEADING_TILE_VALUES = ['textual','avatar','icon','image','thumbnail','video'];

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

  get leadingTileStyle () {
    const { leadingTile } = this.args;
    assert (`@leadingTile must be one of the following values: ${LEADING_TILE_VALUES}`, isNone (leadingTile) || LEADING_TILE_VALUES.includes (leadingTile));

    return isPresent (leadingTile) ? `mdc-list--${leadingTile}-list` : null;
  }
}
