/* global mdc */

import Component from 'ember-cli-mdc-base/component';
import listener from 'ember-cli-mdc-base/listener';

const { MDCDataTable } = mdc.dataTable;
import { dasherize } from '@ember/string';
import { get } from '@ember/object';
import { isPresent, isNone } from '@ember/utils';
import { A } from '@ember/array';
import { action } from '@ember/object';

import { tracked } from "@glimmer/tracking";

import isString from '../utils/is-string';

function noOp () { }

class DataTablePagination {
  constructor (rowsPerPage) {
    this.rowsPerPage = rowsPerPage;
  }

  @tracked
  rowsPerPage;

  @tracked
  currentPage = 1;

  @tracked
  pageCount;

  get isFirstPage () {
    return this.currentPage === 1;
  }

  get isLastPage () {
    return this.currentPage === this.pageCount;
  }

  gotoFirstPage () {
    this.currentPage = 1;
  }

  gotoPrevPage () {
    if (this.currentPage > 1) {
      this.currentPage --;
    }
  }

  gotoNextPage () {
    if (this.currentPage < this.pageCount) {
      this.currentPage ++;
    }
  }

  gotoLastPage () {
    this.currentPage = this.pageCount;
  }

  hasMultiplePages () {
    return this.pageCount > 1;
  }
}

/**
 * The representation of a single row in the data table.
 */
class DataTableRow {
  constructor (table, data) {
    this.dataTable = table;
    this.data = data;
  }

  @tracked
  data;

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

  selected () {
    const id = this.id;
    const item = this.dataTable.selected.find (selection => `${get (selection, this.dataTable.idKey)}` === id);

    return isPresent (item);
  }
}

/**
 * The data table component.
 */
export default class MdcDataTableComponent extends Component {
  @tracked
  pagination;

  get labelClassName () {
    const { label } = this.args;
    return isPresent (label) ? `mdc-data-table--${dasherize (label)}` : null;
  }

  doCreateComponent (element) {
    return new MDCDataTable (element);
  }

  doInitComponent (component) {
    const { rowsPerPage } = this.args;

    if (isPresent (rowsPerPage)) {
      this.pagination = new DataTablePagination (rowsPerPage);
    }

    this.computeTableData ();
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

  @action
  layout () {
    // We need to make sure the elements that can be selected are each listed in
    // the data items. If not, then we need to remove it.

    const removable = this.selected.filter (selection => {
      const selectionRowId = `${get (selection, this.idKey)}`;
      const item = this.args.data.find (item => `${get (item, this.idKey)}` === selectionRowId);

      return isNone (item);
    });

    if (isPresent (removable)) {
      this.selected.removeObjects (removable);
    }

    // Now, we need to replace the current selected objects with new objects.

    this.component.layout ();
  }

  @tracked
  data;

  @action
  computeTableData () {
    let { rowsPerPage, data = A () } = this.args;

    // Either initialize the pagenation, or update the current one.
    if (isPresent (rowsPerPage)) {
      if (isPresent (this.pagination)) {
        this.pagination.rowsPerPage = rowsPerPage;
      }
      else {
        this.pagination = new DataTablePagination (rowsPerPage);
      }

      this.pagination.pageCount = Math.ceil (this.args.data.length / rowsPerPage);
    }
    else if (isPresent (this.pagination)) {
      this.pagination = null;
    }

    if (isPresent (data) && isPresent (this.pagination)) {
      const { rowsPerPage, currentPage } = this.pagination;
      const startIndex = (currentPage - 1) * rowsPerPage;
      const endIndex = startIndex + rowsPerPage;

      data = data.slice (startIndex, endIndex);
    }

    // We need to flatten (or map) each object in the data into an array.
    this.data = data.map (row => new DataTableRow (this, row));
  }

  get fields () {
    return this.args.fields || A ();
  }

  get idKey () {
    return this.args.idKey || 'id';
  }

  @action
  gotoFirstPage () {
    this.pagination.gotoFirstPage ();
    this.computeTableData ();
  }

  @action
  gotoPrevPage () {
    this.pagination.gotoPrevPage ();
    this.computeTableData ();
  }

  @action
  gotoNextPage () {
    this.pagination.gotoNextPage ();
    this.computeTableData ();
  }

  @action
  gotoLastPage () {
    this.pagination.gotoLastPage ();
    this.computeTableData ();
  }
}
