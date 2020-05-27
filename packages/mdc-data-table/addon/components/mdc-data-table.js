/* global mdc */

import Component from '@ember/component';
import layout from '../templates/components/mdc-data-table';

const { MDCDataTable } = mdc.dataTable;
import { dasherize } from '@ember/string';
import { computed } from '@ember/object';
import { isPresent, isEmpty } from '@ember/utils';
import { A } from '@ember/array';

function noOp () {

}

export default Component.extend({
  layout,

  classNames: ['mdc-data-table'],
  classNameBindings: ['mdcDataTableLabelClassName'],

  mdcDataTableLabelClassName: computed ('label', function () {
    let label = this.get ('label');
    return isPresent (label) ? `mdc-data-table--${dasherize (label)}` : null;
  }),

  _dataTable: null,
  _mdcDataTableChangedListener: null,
  _mdcDataTableSelectedAllListener: null,
  _mdcDataTableUnselectedAllListener: null,

  selected: null,

  init () {
    this._super (...arguments);
    this._mdcDataTableChangedListener = this._mdcDataTableRowSelectionChanged.bind (this);
    this._mdcDataTableSelectedAllListener = this._mdcDataTableSelectedAll.bind (this);
    this._mdcDataTableUnselectedAllListener = this._mdcDataTableUnselectedAll.bind (this);
  },

  didInsertElement () {
    this._super (...arguments);

    this._dataTable = new MDCDataTable (this.element);
    this._dataTable.listen ('MDCDataTable:rowSelectionChanged', this._mdcDataTableChangedListener);
    this._dataTable.listen ('MDCDataTable:selectedAll', this._mdcDataTableSelectedAllListener);
    this._dataTable.listen ('MDCDataTable:unselectedAll', this._mdcDataTableUnselectedAllListener);

    if (isEmpty (this.selected)) {
      this.set ('selected', A ());
    }
  },

  willDestroyElement () {
    this._super (...arguments);

    // Temp disable because there is a bug in the raw data table if the data table does
    // not contain a checkbox.

    this._dataTable.unlisten ('MDCDataTable:rowSelectionChanged', this._mdcDataTableChangedListener);
    this._dataTable.unlisten ('MDCDataTable:selectedAll', this._mdcDataTableSelectedAllListener);

    //this._dataTable.destroy ();
  },

  _mdcDataTableSelectedAll () {
    this.selected.addObjects (this._dataTable.getSelectedRowIds ());
  },

  _mdcDataTableUnselectedAll () {
    this.selected.clear ();
  },

  _mdcDataTableRowSelectionChanged (ev) {
    // Update the collection of selected elements ids.
    const { detail } = ev;

    if (detail.selected) {
      this.selected.addObject (detail.rowId);
    }
    else {
      this.selected.removeObject (detail.rowId);
    }

    // Notify the parent component that the data table selection has changed.
    this.didRowSelectionChange (ev);
    this.getWithDefault ('rowSelectionChange', noOp) (ev);
  },

  didRowSelectionChange () {

  }
});
