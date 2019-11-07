import Component from '@ember/component';
import layout from '../templates/components/mdc-data-table-header-cell';

import CellMixin from '../mixins/cell';

export default Component.extend (CellMixin, {
  layout,

  tagName: 'th',

  classNames: ['mdc-data-table__header-cell'],
  classNameBindings: ['checkbox:mdc-data-table__header-cell--checkbox'],

  didInsertElement () {
    this._super (...arguments);

    this.element.setAttribute ('role', 'columnheader');
    this.element.setAttribute ('scope', 'col');
  }
});
