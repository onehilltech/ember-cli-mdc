/* global mdc */

import Component from 'ember-cli-mdc-base/component';
import listener from 'ember-cli-mdc-base/listener';
import { action, get } from '@ember/object';
import { isPresent } from '@ember/utils';
import { dasherize } from '@ember/string';

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
    this.doBeforeInitialize ();
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
    this.doInitialize (this._chipSet);
  }

  doBeforeInitialize () {

  }

  doInitialize (chipSet) {

  }

  @listener ('MDCChip:interaction')
  interaction (ev) {
    const { detail: { chipId } } = ev;

    this.didInteraction (chipId);
    (this.args.interaction || noOp)(chipId);
  }

  didInteraction (chipId) {

  }

  @listener ('MDCChip:selection')
  selection (ev) {
    const { detail: { chipId, selected } }  = ev;

    this.didSelection (chipId, selected);
    (this.args.selection || noOp)(chipId, selected);
  }

  didSelection (chipId, selected) {

  }

  @listener ('MDCChip:removal')
  removal (ev) {
    const { detail: { chipId } } = ev;

    this.didRemoval (chipId);
    (this.args.removal || noOp)(chipId);
  }

  didRemoval (chipId) {

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

  get _type () {
    return isPresent (this.type) ? `mdc-chip-set--${this.type}` : null;
  }

  get label () {
    return isPresent (this.args.label) ? `mdc-chip-set--${dasherize (this.args.label)}` : null;
  }

  get chips () {
    return this.args.chips || [];
  }

  getChipId (chip) {
    return get (chip, this.idKey);
  }

  select (chipId) {
    return this._chipSet.foundation_.select (chipId);
  }

  findChipById (chipId) {
    return this.chips.find (chip => get (chip, this.idKey) === chipId);
  }

  /// Adapter Properties

  get idKey () {
    return this.args.idKey || 'id';
  }

  get textKey () {
    return this.args.textKey || 'text';
  }
}
