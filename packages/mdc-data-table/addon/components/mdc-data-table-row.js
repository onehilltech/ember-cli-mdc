import Component from '@ember/component';
import layout from '../templates/components/mdc-data-table-row';
import { readOnly } from '@ember/object/computed';

export default Component.extend({
  layout,

  tagName: 'tr',

  classNames: ['mdc-data-table__row'],
  classNameBindings: ['selected:mdc-data-table__row--selected'],
  attributeBindings: ['rowId:data-row-id'],

  rowId: readOnly ('data.id')
});
