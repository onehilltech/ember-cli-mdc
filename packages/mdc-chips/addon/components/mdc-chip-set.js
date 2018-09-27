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

export default Component.extend ({
  layout,

  classNames: [CLASS_NAME_MDC_CHIP_SET],
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

  didClick ({target}) {
    // There is a good chance the user clicked the text part of the chip. If this
    // is the case, then we need to get the parent element, which should be the
    // chip.

    let element = this._getChipOrChipSetFromElement (target);

    if (!element.classList.contains (CLASS_NAME_MDC_CHIP))
      return;

    let chip = this._chipSet.findChip (element.id);

    if (isPresent (chip))
      this.didClickChip (chip);
  },

  didClickChip (/*chip*/) {

  },

  _getChipOrChipSetFromElement (e) {
    while (!e.classList.contains (CLASS_NAME_MDC_CHIP) && !e.classList.contains (CLASS_NAME_MDC_CHIP_SET))
      e = e.parentElement;

    return e;
  }
});
