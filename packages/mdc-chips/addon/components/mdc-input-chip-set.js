import ChipSet from './mdc-chip-set';
import layout from '../templates/components/mdc-input-chip-set';

import { A } from '@ember/array';

function simpleChipFactory (value) {
  return {text: value, iconTrailing: 'cancel'};
}

export default ChipSet.extend({
  layout,

  mode: 'input',

  didInsertElement () {
    this._super (...arguments);

    this.set ('chips', A ());
  },

  actions: {
    enter () {
      let chip = this.getWithDefault ('create', simpleChipFactory) (this.value);
      this.get ('chips').pushObject (chip);

      this.set ('value', null);
    }
  }
});
