import ChipSetComponent from './mdc-chip-set';

import { action } from '@ember/object';
import { isPresent } from '@ember/utils';
import { assert } from '@ember/debug';

function noOp () {}

export default class MdcChoiceChipSetComponent extends ChipSetComponent {
  type = 'choice';

  _currentChoiceId = null;

  doInitComponent (chipSet) {
    super.doInitComponent (chipSet);

    let { choice } = this.args;

    if (isPresent (choice)) {
      this._currentChoiceId = this.getChipId (choice);
      this.select (this._currentChoiceId);
    }
  }

  didSelection (chipId, selected) {
    if (isPresent (this.chips)) {
      // The user wants us to automate the handling of selecting a chip.

      if (selected) {
        // Locate the index of the selected chip, and return that one to the user.
        let chip = this.findChipById (chipId);
        assert (`The choice chip set does not have a chip with the id ${chipId}`, isPresent (chip));

        this.notifyChange (chip);
      }
      else {
        this.notifyChange (null);
      }
    }
  }

  notifyChange (choice) {
    this._currentChoiceId = isPresent (choice) ? this.getChipId (choice) : null;
    this.change (choice);
  }

  get change () {
    return this.args.change || noOp;
  }

  get syncKey () {
    return this.args.choice;
  }

  @action
  sync () {
    // We need to locate the chip that was selected.
    let choice = this.syncKey;

    if (isPresent (choice)) {
      // There was a outside change. We need to select the chip that matches the
      // change if the choice is different from the current one.

      let chipId = this.getChipId (choice);

      if (this._currentChoiceId !== chipId) {
        this.select (chipId);
        this._currentChoiceId = chipId;
      }
    }
    else if (isPresent (this._currentChoiceId)) {
      // There is no selection. This means we need to clear the selection.
      this.select (null);
      this._currentChoiceId = null;
    }
  }
}
