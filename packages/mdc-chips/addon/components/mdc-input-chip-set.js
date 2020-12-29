import ChipSet from './mdc-chip-set';

import { action } from '@ember/object';
import { isPresent } from '@ember/utils';

function noOp () {
  return false;
}

export default class MdcInputChipSetComponent extends ChipSet {
  type = 'input';

  @action
  createChip (ev) {
    const { target, key, keyCode } = ev;

    if (key === 'Enter' || keyCode === 13) {
      if (isPresent (target.value)) {
        // Notify the user of the new value. We then need to erase the original
        // input value if the action does not return false.

        if ((this.args.input || noOp)(target.value) !== false) {
          target.value = null;
        }
      }
    }
  }
}

