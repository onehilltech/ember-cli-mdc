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

  selected: null,

  init () {
    this._super (...arguments);
    this._mdcDataTableChangedListener = this._mdcDataTableRowSelectionChanged.bind (this);
  },

  didInsertElement () {
    this._super (...arguments);

    this._dataTable = new MDCDataTable (this.element);
    this._dataTable.listen ('MDCDataTable:rowSelectionChanged', this._mdcDataTableChangedListener);

    if (isEmpty (this.selected)) {
      this.set ('selected', A ());
    }
  },

  willDestroyElement () {
    this._super (...arguments);

    // Temp disable because there is a bug in the raw data table if the data table does
    // not contain a checkbox.

    //this._dataTable.destroy ();
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
