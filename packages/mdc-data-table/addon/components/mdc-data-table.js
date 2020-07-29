/* global mdc */

import Component from '@ember/component';
import layout from '../templates/components/mdc-data-table';

const { MDCDataTable } = mdc.dataTable;
import { dasherize } from '@ember/string';
import { computed, get } from '@ember/object';
import { map, bool } from '@ember/object/computed';
import { isPresent, isEmpty } from '@ember/utils';
import { A } from '@ember/array';

function noOp () { }

// This function is taken from lodash. Instead of importing the entire lodash library into the ember
// application. We just need this one function.
function isString (value) {
  return typeof value === 'string' || value instanceof String;
}

function getRowId (item) {
  return isString (item) ? item : get (item, 'id');
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

  /// Check if the data table has data objects.
  hasData: bool ('data'),

  /// The collection of selected items.
  selected: null,

  /// The row ids for the selected items.
  selectedRowIds: map ('selected', getRowId),

  /// Make the data table interactive.
  interactive: false,

  init () {
    this._super (...arguments);
    this._mdcDataTableChangedListener = this._mdcDataTableRowSelectionChanged.bind (this);
    this._mdcDataTableSelectedAllListener = this._mdcDataTableSelectedAll.bind (this);
    this._mdcDataTableUnselectedAllListener = this._mdcDataTableUnselectedAll.bind (this);
  },

  didInsertElement () {
    this._super (...arguments);

    if (this.interactive) {
      this._dataTable = new MDCDataTable (this.element);
      this._dataTable.listen ('MDCDataTable:rowSelectionChanged', this._mdcDataTableChangedListener);
      this._dataTable.listen ('MDCDataTable:selectedAll', this._mdcDataTableSelectedAllListener);
      this._dataTable.listen ('MDCDataTable:unselectedAll', this._mdcDataTableUnselectedAllListener);

      if (isEmpty (this.selected)) {
        this.set ('selected', A ());
      }
      else {
        this._dataTable.setSelectedRowIds (this.selectedRowIds);
      }
    }
  },

  willDestroyElement () {
    this._super (...arguments);

    // Temp disable because there is a bug in the raw data table if the data table does
    // not contain a checkbox.

    if (this.interactive) {
      this._dataTable.unlisten ('MDCDataTable:rowSelectionChanged', this._mdcDataTableChangedListener);
      this._dataTable.unlisten ('MDCDataTable:selectedAll', this._mdcDataTableSelectedAllListener);
      this._dataTable.unlisten ('MDCDataTable:unselectedAll', this._mdcDataTableUnselectedAllListener);

      //this._dataTable.destroy ();
    }
  },

  didRowSelectionChange () {

  },

  didSelectAll () {

  },

  didUnselectAll () {

  },

  _mdcDataTableSelectedAll () {
    let values = this.hasData ? this.data : this._dataTable.getSelectedRowIds ();
    this.selected.addObjects (values);

    // Send notification to the subclass.
    this.didSelectAll ();
  },

  _mdcDataTableUnselectedAll () {
    this.selected.clear ();

    // Send notification to the subclass.
    this.didUnselectAll ();
  },

  _mdcDataTableRowSelectionChanged (ev) {
    // Update the collection of selected elements ids.
    const { detail } = ev;

    // If we are working with data models, then use the index of the selected row to
    // locate the correct value. If we are not working with data models, then we can
    // just use the row id.

    let value = this.hasData ? this.data[detail.rowIndex] : detail.rowId;

    if (detail.selected) {
      this.selected.addObject (value);
    }
    else {
      this.selected.removeObject (value);
    }

    // Notify the parent component that the data table selection has changed.
    this.didRowSelectionChange (ev);
    this.getWithDefault ('rowSelectionChange', noOp) (ev);
  }
});
