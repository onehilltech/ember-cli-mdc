import ChipSet from './mdc-chip-set';

import { action, getWithDefault } from '@ember/object';
import { isPresent } from '@ember/utils';

function noOp () {
  return false;
}

export default class MdcInputChipSetComponent extends ChipSet {
  type = 'input';

  get breakOnSpace () {
    return getWithDefault (this.args, 'breakOnSpace', false);
  }

  customKeyCode (keyCode) {
    const customKeyCode = this.args.customKeyCode;
    return isPresent (customKeyCode) && customKeyCode === keyCode;
  }

  @action
  createChip (ev) {
    const { target, key, keyCode } = ev;

    if ((keyCode === 13 || key === 'Enter') || (this.breakOnSpace && (keyCode === 32 || key === 'Space')) || this.customKeyCode (keyCode)) {
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
