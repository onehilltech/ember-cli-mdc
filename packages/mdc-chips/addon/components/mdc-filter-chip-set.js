import ChipSetComponent from './mdc-chip-set';
import layout from '../templates/components/mdc-filter-chip-set';

export default ChipSetComponent.extend({
  layout,

  classNames: ['mdc-chip-set--filter'],

  _clickEventListener: null,

  value: null,

  didClickChip (chip) {
    let value = this.get ('value');

    if (chip.selected) {
      value.addObject (chip.id);
    }
    else {
      value.removeObject (chip.id);
    }
  }
});
