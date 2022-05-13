/* global mdc */

import Component from 'ember-cli-mdc-base/component';
import listener from 'ember-cli-mdc-base/listener';

const { MDCDataTable } = mdc.dataTable;
import { dasherize } from '@ember/string';
import { get } from '@ember/object';
import { isPresent, isNone, isEmpty } from '@ember/utils';
import { A } from '@ember/array';
import { action } from '@ember/object';

import { tracked } from "@glimmer/tracking";

import isString from '../utils/is-string';

function noOp () { }

class DataTablePagination {
  constructor (rowsPerPage) {
    this.rowsPerPage = rowsPerPage;
    this.data = A ();
  }

  @tracked
  rowsPerPage;

  @tracked
  currentPage = 1;

  @tracked
  data;

  get pageCount () {
    return Math.ceil (this.data.length / this.rowsPerPage);
  }

  get currentPageData () {
    if (isPresent (this.data)) {
      return this.data.slice (this.startIndex, this.endIndex);
    }
    else {
      return this.data;
    }
  }

  get startIndex () {
    return (this.currentPage - 1) * this.rowsPerPage;
  }

  get endIndex () {
    return this.startIndex + this.rowsPerPage;
  }

  get firstItem () {
    return this.startIndex + 1;
  }

  get lastItem () {
    return Math.min (this.endIndex, this.data.length);
  }

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
    const { pagination = false, rowsPerPage = [25, 50, 75, 100] } = this.args;

    if (isPresent (pagination)) {
      this.pagination = new DataTablePagination (rowsPerPage[0]);
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
    let { data = A () } = this.args;

    if (this.pagination) {
      // Set the data in the pagination object, and then get the data for the
      // current page.

      this.pagination.data = data;
      data = this.pagination.currentPageData;
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

  get rowsPerPageOptions () {
    const rowsPerPage = this.args.rowsPerPage || [25, 50, 75, 100];
    return rowsPerPage.map (rows => ({ value: rows, text: `${rows}` }));
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

  @action
  async changeRowsPerPage (option) {
    const { value } = option;

    this.pagination.rowsPerPage = value;
    this.computeTableData ();
  }
}
