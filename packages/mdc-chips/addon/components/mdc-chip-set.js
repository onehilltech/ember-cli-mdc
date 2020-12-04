/* global mdc */

import Component from 'ember-cli-mdc-base/component';
import listener from 'ember-cli-mdc-base/listener';
import { action } from '@ember/object';
import { isPresent } from '@ember/utils';

const { MDCChipSet } = mdc.chips;

/*
MDCChipSet.prototype.select = function (chipId) {
  return this.foundation_.select (chipId);
};

MDCChipSet.prototype.deselect = function (chipId) {
  return this.foundation_.deselect_ (chipId);
};

MDCChipSet.prototype.isSelected = function (chipId) {
  return this.foundation_.getSelectedChipIds ().includes (chipId);
};

MDCChipSet.prototype.findChip = function (chipId) {
  let index = this.findChipIndex_ (chipId);
  return index >= 0 ? this.chips[index] : null;
};*/

function noOp () {}

export default class MdcChipSetComponent extends Component {
  @action
  didInsert (element) {
    let chipSet = new MDCChipSet (element);

    if (isPresent (this.args.chips)) {
      // The user has provided a list of chips. This means that we are managing the
      // chip collection. We are going to prevent the chipset from removing the chip
      // with the trailing icon is clicked.

      chipSet.chips.forEach ((chip) => {
        chip.shouldRemoveOnTrailingIconClick = false;
      });
    }

    this._mdcComponentCreated (chipSet);
  }

  @listener ('MDCChip:interaction')
  interaction ({ detail: { chipId } }) {
    (this.args.interaction || noOp)(chipId);
  }

  @listener ('MDCChip:removal')
  removal ({detail: { chipId }}) {
    (this.args.removal || noOp)(chipId);
  }

  @action
  removeChip (chip) {
    // Get the index of the chip, and remove it from the list of chips.
    let chipElement = chip.element;
    let chipSetElement = chip.element.parentElement;
    let index = Array.from (chipSetElement.children).indexOf (chipElement);

    if (index > -1) {
      this.args.chips.removeAt (index);
    }
  }

  /// Adapter Properties

  get idKey () {
    return this.args.idKey || 'id';
  }

  get textKey () {
    return this.args.textKey || 'text';
  }
}
