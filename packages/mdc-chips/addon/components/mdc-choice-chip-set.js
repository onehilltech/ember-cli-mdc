import ChipSetComponent from './mdc-chip-set';

import { isPresent, isNone } from '@ember/utils';

const CLASS_NAME_MDC_CHIP_SELECTED = 'mdc-chip--selected';
const CLASS_NAME_MDC_CHIP_TEXT = 'mdc-chip__text';
const CLASS_NAME_MDC_CHIP = 'mdc-chip';

export default ChipSetComponent.extend ({
  classNames: ['mdc-chip-set--choice'],

  _clickEventListener: null,

  /// The selected value in the choice.
  value: null,

  init () {
    this._super (...arguments);

    this._clickEventListener = this.didClick.bind (this);
  },

  didInsertElement () {
    this._super (...arguments);

    let value = this.get ('value');

    if (isPresent (value)) {
      this._chipSet.select (value);
    }

    this.element.addEventListener ('click', this._clickEventListener);
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

  didClick ({target:chip}) {
    // There is a good chance the user clicked the text part of the chip. If this
    // is the case, then we need to get the parent element, which should be the
    // chip.

    if (chip.classList.contains (CLASS_NAME_MDC_CHIP_TEXT))
      chip = chip.parentElement;

    // This should only work if the element clicked was a chip.
    if (!chip.classList.contains (CLASS_NAME_MDC_CHIP))
      return;

    if (chip.classList.contains (CLASS_NAME_MDC_CHIP_SELECTED)) {
      this.set ('value', chip.id);
    }
    else {
      // Erase the currently selected value.
      this.set ('value', null);
    }
  }
});
