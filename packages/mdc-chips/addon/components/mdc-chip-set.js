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

export default Component.extend ({
  layout,

  classNames: ['mdc-chip-set'],
  classNameBindings: ['modeClassName'],

  mode: null,
  modeClassName: computed ('mode', function () {
    let mode = this.get ('mode');
    return isPresent (mode) ? `mdc-chip-set--${mode}` : null;
  }),

  _clickEventListener: null,


  init () {
    this._super (...arguments);

    this._clickEventListener = this.didClick.bind (this);
  },

  didInsertElement () {
    this._super (...arguments);

    this._chipSet = new MDCChipSet (this.element);
    this.element.addEventListener ('click', this._clickEventListener);
  },

  willDestroyElement () {
    this._super (...arguments);

    this._chipSet.destroy ();
  },

  didClick ({target:chipElement}) {
    // There is a good chance the user clicked the text part of the chip. If this
    // is the case, then we need to get the parent element, which should be the
    // chip.

    if (chipElement.classList.contains (CLASS_NAME_MDC_CHIP_TEXT))
      chipElement = chipElement.parentElement;

    // This should only work if the element clicked was a chip.
    if (!chipElement.classList.contains (CLASS_NAME_MDC_CHIP))
      return;

    let chip = this._chipSet.findChip (chipElement.id);

    if (isPresent (chip))
      this.didClickChip (chip);
  },

  didClickChip (/*chip*/) {

  }
});
