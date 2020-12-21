/* global mdc */

import Component from 'ember-cli-mdc-base/component';
import listener from 'ember-cli-mdc-base/listener';

const { MDCDataTable } = mdc.dataTable;
import { dasherize } from '@ember/string';
import { get } from '@ember/object';
import { isPresent } from '@ember/utils';
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

/**
 * The representation of a single row in the data table.
 */
class DataTableRow {
  constructor (table, data) {
    this.dataTable = table;
    this.data = data;
  }

  get id () {
    return get (this.data, this.dataTable.idKey);
  }

  get values () {
    const { idKey, fields } = this.dataTable;

    if (isPresent (fields)) {
      return fields.map (field => this.data[field]);
    }
    else {
      // Copy the data object, and return all the values except for the id.
      let valueObj = { ... this.data };
      delete valueObj[idKey];

      return Object.values (valueObj);
    }
  }
}

/**
 * The data table component.
 */
export default class MdcDataTableComponent extends Component {
  get labelClassName () {
    const { label } = this.args;
    return isPresent (label) ? `mdc-data-table--${dasherize (label)}` : null;
  }

  doCreateComponent (element) {
    return new MDCDataTable (element);
  }

  get headers () {
    return this.args.headers.map (header => isString (header) ? ({name: header}) : header);
  }

  @listener ('MDCDataTable:rowSelectionChanged')
  rowSelectionChanged (ev) {
    const { detail: { rowId, rowIndex, selected }} = ev;
    const { data } = this.args;

    if (isPresent (data)) {
      let item = data.find (item => `${get (item, this.idKey)}` === rowId);

      if (selected) {
        this.selected.addObject (item);
      }
      else {
        this.selected.removeObject (item);
      }
    }

    // Notify the subclass, and the listener.
    (this.args.rowSelectionChanged || noOp)(rowId, rowIndex);
    this.doRowSelectionChanged (ev);
  }

  doRowSelectionChanged (ev) {

  }

  @listener ('MDCDataTable:selectedAll')
  selectedAll (ev) {
    const { data } = this.args;

    if (isPresent (data)) {
      this.selected.addObjects (data);
    }

    // Notify the subclass, and the listener.
    this.doSelectedAll (ev);
    (this.args.selectedAll || noOp)();
  }

  doSelectedAll (ev) {

  }

  @listener ('MDCDataTable:unselectedAll')
  unselectedAll (ev) {
    // Clear the selected objects.
    this.selected.clear ();

    // Notify the subclass, and the listener.
    this.doUnselectAll (ev);
    (this.args.unselectedAll || noOp)();
  }

  doUnselectAll (ev) {

  }

  get selected () {
    return this.args.selected || A ();
  }

  get data () {
    // We need to flatten (or map) each object in the data into an array.
    return this.args.data.map (item => new DataTableRow (this, item));
  }

  get fields () {
    return this.args.fields || A ();
  }

  get idKey () {
    return this.args.idKey || 'id';
  }
}
