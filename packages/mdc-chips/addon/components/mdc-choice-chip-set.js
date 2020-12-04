import ChipSetComponent from './mdc-chip-set';
import listener from 'ember-cli-mdc-base/listener';

import { get } from '@ember/object';
import { isPresent } from '@ember/utils';
import { assert } from '@ember/debug';

function noOp () {}

export default class MdcChoiceChipSetComponent extends ChipSetComponent {
  type = 'choice';

  @listener ('MDCChip:selection')
  selection (ev) {
    const { detail: {chipId, selected } }  = ev;

    if (isPresent (this.args.chips)) {
      // The user has provide a list of chips. We are going to either return the chip
      // that was selected, or return null.

      if (selected) {
        // Locate the index of the selected chip, and return that one to the user.
        let chip = this.args.chips.find (chip => get (chip, this.idKey) === chipId);
        assert (`The choice chip set does not have a chip with the id ${chipId}`, isPresent (chip));

        this.change (chip);
      }
      else {
        this.change (undefined);
      }
    }
    else {
      // The user did block creation of the choice chip set. We therefore are just going
      // to return the selection information to the user.

      (this.args.selection || noOp) (chipId, selected);
    }
  }

  get change () {
    return this.args.change || noOp;
  }
}

/*
  didInsertElement () {
    this._super (...arguments);

    // If there is an initial value, then we need to select an initial chip.
    let value = this.value;

    if (isPresent (value)) {
      this._chipSet.select (value);
    }
  },

  didUpdateAttrs () {
    this._super (...arguments);

    let value = this.value;

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

  didSelectChip (chipId, selected) {
    this.set ('value', selected ? chipId : null);
  }
});
*/