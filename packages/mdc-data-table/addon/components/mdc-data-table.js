import Component from 'ember-cli-mdc-base/component';
import listener from 'ember-cli-mdc-base/listener';

import { dasherize } from '@ember/string';
import { get } from '@ember/object';
import { isPresent, isNone, isEmpty } from '@ember/utils';
import { A } from '@ember/array';

import { action } from '@ember/object';
import { next } from '@ember/runloop';

import { tracked } from "@glimmer/tracking";

import { MDCDataTable } from '@material/data-table';

import isString from '../utils/is-string';

function noOp () { }

class DataTablePagination {
  constructor (rowsPerPage) {
    this.rowsPerPage = rowsPerPage;
    this.rows = A ();
  }

  @tracked
  rowsPerPage;

  @tracked
  currentPage = 1;

  @tracked
  data;

  get pageCount () {
    return isPresent (this.rowsPerPage) && isPresent (this.data) ? Math.ceil (this.data.length / this.rowsPerPage) : 1;
  }

  get currentPageData () {
    if (this.pageCount > 1) {
      return this.data.slice (this.startIndex, this.endIndex);
    }
    else {
      return this.data;
    }
  }

  get startIndex () {
    return isPresent (this.rowsPerPage) ? (this.currentPage - 1) * this.rowsPerPage : 0;
  }

  get endIndex () {
    return isPresent (this.rowsPerPage) ? this.startIndex + this.rowsPerPage : this.data.length - 1;
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
    return this.dataTable.idForItem (this.data);
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

  get selected () {
    const { id, dataTable } = this;
    const item = dataTable.selected.find (selection => dataTable.idForItem (selection) === id);

    return isPresent (item);
  }

  set selected (value) {
    const { dataTable } = this;

    if (value === false) {
      dataTable.selected.removeObject (this);
    }
    else if (value === true) {
      dataTable.selected.addObject (this);
    }
  }
}

/**
 * The data table component.
 */
export default class MdcDataTableComponent extends Component {
  constructor () {
    super (...arguments);

    this.selected = A (this.args.selected || []);
  }

  get labelClassName () {
    const { label } = this.args;
    return isPresent (label) ? `mdc-data-table--${dasherize (label)}` : null;
  }

  doCreateComponent (element) {
    return new MDCDataTable (element);
  }

  doInitComponent () {
    const { pagination = false, rowsPerPage = [25, 50, 75, 100] } = this.args;
    this.rows = A ();
    this.rowsById = {};

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

    if (selected) {
      const row = this.rows.find (row => row.id === rowId);

      if (isPresent (row)) {
        this.selected.addObject (row);
      }
    }
    else {
      const rowIndex = this.selected.findIndex (row => row.id === rowId);

      if (rowIndex !== -1) {
        this.selected.removeAt (rowIndex);
      }
    }

    // Notify the subclass, and the listener.
    (this.args.rowSelectionChanged || noOp)(rowId, rowIndex);
    this.doRowSelectionChanged (ev);
  }

  doRowSelectionChanged (ev) {

  }

  @listener ('MDCDataTable:selectedAll')
  selectedAll () {
    this.selected.setObjects (this.rows);
    this.notifySelectAll ();
  }

  notifySelectAll () {
    this.doSelectedAll ();
    this.dispatchEvent ('MdcDataTable:selectAll');
  }

  doSelectedAll (ev) {

  }

  @listener ('MDCDataTable:unselectedAll')
  unselectedAll (ev) {
    // Clear the selected objects.
    this.selected.clear ();
    this.notifyUnselectAll ();
  }

  notifyUnselectAll () {
    this.doUnselectAll ();
    this.dispatchEvent ('MdcDataTable:unselectAll');
  }

  doUnselectAll (ev) {

  }

  @tracked
  pagination;

  @tracked
  rows;

  rowsById;

  @tracked
  stale;

  @tracked
  selected;

  @action
  updateData () {
    try {
      this.computeTableData ();
    }
    catch (err) {
      console.error (err);
    }
  }

  /**
   * Compute the table data.
   *
   * @param refreshLayoutNext
   */
  computeTableData (refreshLayoutNext = false) {
    let { data = A () } = this.args;

    if (this.pagination) {
      // Set the data in the pagination object, and then get the data for the
      // current page.

      this.pagination.data = data;
      data = this.pagination.currentPageData;
    }

    // We need to map each item in the data to its DataItem object. We are going
    // to cache the DataItem so we can reuse the DataItem each time the item appears
    // in the data.

    const rows = data.map (item => {
      const id = this.idForItem (item);
      let row = this.rowsById[id];

      if (isNone (row)) {
        row = new DataTableRow (this, item);
        this.rowsById[id] = row;
      }

      return row;
    });

    this.rows.setObjects (rows);

    // Lastly, we need to make sure items in the selected list are actually part of
    // the data collection.

    const removable = this.selected.filter (selection => {
      const selectionRowId = this.idForItem (selection);
      const item = this.rows.find (item => this.idForItem (item) === selectionRowId);

      return isNone (item);
    });

    if (isPresent (removable)) {
      this.selected.removeObjects (removable);
    }

    // Anytime we update the table data, we need to force the underlying component
    // to update its layout. This will ensure we have the correct checkboxes.

    if (refreshLayoutNext) {
      next (this, 'performLayoutUpdate');
    }
    else {
      this.performLayoutUpdate ();
    }
  }

  /**
   * Update the layout for the component.
   */
  performLayoutUpdate () {
    this.component.layout ();
    this.stale = this.rows.length !== this.component.getRows ().length;

    if (this.stale) {
      next (this, 'performLayoutUpdate');
    }

    return this.stale;
  }

  @action
  updateSelections () {
    try {
      const rows = this.component.getRows ();

      if (isEmpty (rows)) {
        return;
      }

      if (this.stale && !this.performLayoutUpdate ()) {
        return;
      }

      const ids = this.selected.map (item => this.idForItem (item));
      this.component.setSelectedRowIds (ids);
    }
    catch (err) {
      console.log (err);
    }
  }

  get fields () {
    return this.args.fields || A ();
  }

  get idKey () {
    return this.args.idKey || 'id';
  }

  idForItem (item) {
    return `${get (item, this.idKey)}`;
  }

  get rowsPerPageOptions () {
    const rowsPerPage = this.args.rowsPerPage || [25, 50, 75, 100];
    const options = rowsPerPage.map (rows => ({ value: rows, text: `${rows}` }));

    options.push ({ value: 'all', text: '-' });

    return options;
  }

  get rowsPerPageValue () {
    return this.pagination.rowsPerPage || 'all';
  }

  @action
  gotoFirstPage () {
    this.pagination.gotoFirstPage ();
    this.computeTableData (true);
  }

  @action
  gotoPrevPage () {
    this.pagination.gotoPrevPage ();
    this.computeTableData (true);
  }

  @action
  gotoNextPage () {
    this.pagination.gotoNextPage ();
    this.computeTableData (true);
  }

  @action
  gotoLastPage () {
    this.pagination.gotoLastPage ();
    this.computeTableData (true);
  }

  @action
  async changeRowsPerPage (option) {
    if (isPresent (option)) {
      const { value } = option;

      if (value !== this.pagination.rowsPerPage) {
        if (value === 'all') {
          this.pagination.currentPage = 1;
          this.pagination.rowsPerPage = null;
        }
        else {
          this.pagination.rowsPerPage = value;
        }

        this.computeTableData (true);
      }
    }
    else if (isNone (this.pagination.rowsPerPage)) {
      this.pagination.currentPage = 1;
      this.pagination.rowsPerPage = null;

      this.computeTableData (true);
    }
  }
}
