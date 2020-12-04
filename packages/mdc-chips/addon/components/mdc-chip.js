import Component from '@ember/component';
import ChipMixin from '../mixins/chip';

import layout from '../templates/components/mdc-chip';
import { computed } from '@ember/object';

export default Component.extend (ChipMixin, {
  layout,

  didInsertElement () {
    this._super (...arguments);

    this.parentChipSet.addChip (this);
  },

  parentChipSet: computed (function () {
    return this.parentView;
  }).volatile ()
});
