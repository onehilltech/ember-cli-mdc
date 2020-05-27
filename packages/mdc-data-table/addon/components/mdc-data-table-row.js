import Component from '@ember/component';
import layout from '../templates/components/mdc-data-table-row';
import { alias, bool } from '@ember/object/computed';
import { computed, get } from '@ember/object';

export default Component.extend({
  layout,

  tagName: 'tr',

  classNames: ['mdc-data-table__row'],
  classNameBindings: ['selected:mdc-data-table__row--selected'],
  attributeBindings: ['rowId:data-row-id'],

  hasData: bool ('data'),

  _rowId: null,

  rowId: computed ('data.id', {
    get () {
      return this.hasData ? get (this, 'data.id') : this._rowId;
    },

    set (name, value) {
      return this._rowId = value;
    }
  })
});
