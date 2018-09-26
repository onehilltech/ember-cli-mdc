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

export default Component.extend ({
  layout,

  classNames: ['mdc-chip-set'],
  classNameBindings: ['modeClassName'],

  mode: null,
  modeClassName: computed ('mode', function () {
    let mode = this.get ('mode');
    return isPresent (mode) ? `mdc-chip-set--${mode}` : null;
  }),

  didInsertElement () {
    this._super (...arguments);

    this._chipSet = new MDCChipSet (this.element);
  },

  willDestroyElement () {
    this._super (...arguments);

    this._chipSet.destroy ();
  }
});
