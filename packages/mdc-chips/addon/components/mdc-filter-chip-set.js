import ChipSetComponent from './mdc-chip-set';

import { A } from '@ember/array';
import { isPresent } from '@ember/utils';
import { assert } from '@ember/debug';
import { action } from '@ember/object';
import { tracked } from "@glimmer/tracking";

/**
 * @class ChipData
 *
 * The data object for a chip in the filter chip set.
 */
class ChipData {
  constructor (chip, chipSet) {
    this.chip = chip;
    this.chipSet = chipSet;
  }

  get checked () {
    let { filtered } = this.chipSet;
    let chipId = this.chipId;

    return !!filtered.find (chip => this.chipSet.getChipId (chip) === chipId);
  }

  get chipId () {
    return this.chipSet.getChipId (this.chip);
  }
}

/**
 * @class MdcFilterChipSetComponent
 *
 * The filter chip set class.
 */
export default class MdcFilterChipSetComponent extends ChipSetComponent {
  get checkedKey () {
    return this.args.checkedKey || 'checked';
  }

  @tracked
  _data;

  didSelection (ev) {
    const { target, detail: { chipId, selected } }  = ev;

    if (!selected) {
      // The current filter chip component does not remove the hidden class from leading
      // icons when the chip is deselected. This is a patch for the problem so the leading
      // icon on a filter is restored, and visible, and the chip is deselected.

      let leadingIcon = target.querySelector ('.mdc-chip__icon--leading');

      if (isPresent (leadingIcon)) {
        leadingIcon.classList.remove ('mdc-chip__icon--leading-hidden');
      }
    }

    if (isPresent (this.chips)) {
      // The user wants us to automate the handling of selecting a chip.

      let chip = this.findChipById (chipId);
      assert (`The filter chip set does not have a chip with the id ${chipId}`, isPresent (chip));

      if (selected) {
        this.filtered.addObject (chip);
      }
      else {
        this.filtered.removeObject (chip);
      }
    }
  }

  @action
  sync (element, [filtered]) {
    filtered.forEach (chip => this.select (this.getChipId (chip)));
  }

  get filtered () {
    return this.args.filtered || A ();
  }

  get data () {
    return this.chips.map (chip => new ChipData (chip, this));
  }
}
