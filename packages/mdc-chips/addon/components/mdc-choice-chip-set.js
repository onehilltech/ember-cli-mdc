import ChipSetComponent from './mdc-chip-set';

import { isPresent, isNone } from '@ember/utils';

export default ChipSetComponent.extend ({
  classNames: ['mdc-chip-set--choice'],

  /// The selected value in the choice.
  value: null,

  didInsertElement () {
    this._super (...arguments);

    // If there is an initial value, then we need to select an initial chip.
    let value = this.get ('value');

    if (isPresent (value)) {
      this._chipSet.select (value);
    }
  },

  didUpdateAttrs () {
    this._super (...arguments);

    let value = this.get ('value');

    if (isNone (value)) {
      // We need to deselect the currently selected value. Get the ids, and
      // get the first element in the list of ids.
      let ids = this._chipSet.selectedChipIds;

      if (ids.length === 1) {
        this._chipSet.deselect (ids[0]);
      }
    }
    else if (!this._chipSet.isSelected (value)) {
      this._chipSet.select (value);
    }
  },

  didClickChip (chip) {
    // There is a good chance the user clicked the text part of the chip. If this
    // is the case, then we need to get the parent element, which should be the
    // chip.

    this.set ('value', chip.selected ? chip.id : null);
  }
});
