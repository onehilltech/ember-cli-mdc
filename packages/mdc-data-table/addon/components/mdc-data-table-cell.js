import Component from '@ember/component';
import layout from '../templates/components/mdc-data-table-cell';

import CellMixin from '../mixins/cell';

export default Component.extend (CellMixin, {
  layout,

  tagName: 'td',

  classNames: ['mdc-data-table__cell'],
  classNameBindings: ['checkbox:mdc-data-table__cell--checkbox']
});
