import ChipSetComponent from './mdc-chip-set';
import { A } from '@ember/array';
import { isPresent } from '@ember/utils';
import { assert } from '@ember/debug';

export default class MdcFilterChipSetComponent extends ChipSetComponent {
  sync () {

  }

  get checkedKey () {
    return this.args.checkedKey || 'checked';
  }

  didSelection (chipId, selected) {
    let chip = this.findChipById (chipId);
    assert (`The filter chip set does not have a chip with the id ${chipId}`, isPresent (chip));

    if (selected) {
      this.filtered.addObject (chip);
    }
    else {
      this.filtered.removeObject (chip);
    }
  }

  get filtered () {
    return this.args.filtered || A ();
  }
}
