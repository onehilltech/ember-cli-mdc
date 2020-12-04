/* global mdc */

import Component from 'ember-cli-mdc-base/component';
import listener from 'ember-cli-mdc-base/listener';
import { action, get } from '@ember/object';
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
  _chipSet = null;

  @action
  didInsert (element) {
    this._chipSet = new MDCChipSet (element);

    if (isPresent (this.args.chips)) {
      // The user has provided a list of chips. This means that we are managing the
      // chip collection. We are going to prevent the chipset from removing the chip
      // with the trailing icon is clicked.

      this._chipSet.chips.forEach ((chip) => {
        chip.shouldRemoveOnTrailingIconClick = false;
      });
    }

    this._mdcComponentCreated (this._chipSet);
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

  @action
  sync () {

  }

  /// Adapter Properties

  get idKey () {
    return this.args.idKey || 'id';
  }

  get textKey () {
    return this.args.textKey || 'text';
  }

  getChipId (chip) {
    return get (chip, this.idKey);
  }

  select (chipId) {
    return this._chipSet.foundation_.select (chipId);
  }
}
