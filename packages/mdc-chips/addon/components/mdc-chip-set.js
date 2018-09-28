/* global mdc */

import Component from '@ember/component';
import layout from '../templates/components/mdc-chip-set';

import { isPresent } from '@ember/utils';
import { computed } from '@ember/object';

const { MDCChipSet } = mdc.chips;

MDCChipSet.prototype.select = function (chipId) {
  return this.foundation_.select (chipId);
};

MDCChipSet.prototype.deselect = function (chipId) {
  return this.foundation_.deselect (chipId);
};

MDCChipSet.prototype.isSelected = function (chipId) {
  return this.foundation_.getSelectedChipIds ().includes (chipId);
};

MDCChipSet.prototype.findChip = function (chipId) {
  let index = this.findChipIndex_ (chipId);
  return index >= 0 ? this.chips[index] : null;
};

const CLASS_NAME_MDC_CHIP_TEXT = 'mdc-chip__text';
const CLASS_NAME_MDC_CHIP = 'mdc-chip';
const CLASS_NAME_MDC_CHIP_SET = 'mdc-chip-set';

function noOp () {}

export default Component.extend ({
  layout,

  classNames: [CLASS_NAME_MDC_CHIP_SET],
  classNameBindings: ['modeClassName'],

  mode: null,
  modeClassName: computed ('mode', function () {
    let mode = this.get ('mode');
    return isPresent (mode) ? `mdc-chip-set--${mode}` : null;
  }),

  _interactionEventListener: null,
  _selectionEventListener: null,
  _removalEventListener: null,

  init () {
    this._super (...arguments);

    this._interactionEventListener = this.interaction.bind (this);
    this._selectionEventListener = this.selection.bind (this);
    this._removalEventListener = this.removal.bind (this);
  },

  didInsertElement () {
    this._super (...arguments);

    this._chipSet = new MDCChipSet (this.element);
    this._chipSet.listen ('MDCChip:interaction', this._interactionEventListener);
    this._chipSet.listen ('MDCChip:selection', this._selectionEventListener);
    this._chipSet.listen ('MDCChip:removal', this._removalEventListener);
  },

  willDestroyElement () {
    this._super (...arguments);

    this._chipSet.unlisten ('MDCChip:interaction', this._interactionEventListener);
    this._chipSet.unlisten ('MDCChip:selection', this._selectionEventListener);
    this._chipSet.unlisten ('MDCChip:removal', this._removalEventListener);

    this._chipSet.destroy ();
  },

  interaction ({ detail: { chipId } }) {
    this.didInteractWithChip (chipId);
    this.getWithDefault ('interact', noOp) (chipId);
  },

  didInteractWithChip (/* chipId */) {

  },

  selection ({ detail: {chipId, selected}}) {
    this.didSelectChip (chipId, selected);
    this.getWithDefault ('select', noOp) (chipId, selected);
  },

  didSelectChip ( /* chipId, selected */) {

  },

  removal ({detail: { chipId }}) {
    this.didRemoveChip (chipId);
    this.getWithDefault ('remove', noOp) (chipId);
  },

  didRemoveChip (/* chipId */) {

  }
});
