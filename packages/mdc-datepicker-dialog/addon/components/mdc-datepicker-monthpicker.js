import Component from '@ember/component';
import layout from '../templates/components/mdc-datepicker-monthpicker';

import { isPresent } from '@ember/utils';
import moment from 'moment';

const CLASSNAME_MONTH_SELECTED = 'mdc-datepicker-dialog__monthpicker__month--selected';

export default Component.extend({
  layout,

  classNames: ['mdc-datepicker-dialog__monthpicker'],
  classNameBindings: ['show:mdc-datepicker-dialog__monthpicker--show'],

  _monthElements: null,

  _monthCurrent: null,

  didInsertElement () {
    this._super (...arguments);

    this._monthElements = this.element.querySelectorAll ('.mdc-datepicker-dialog__monthpicker__month');
  },

  didRender () {
    this._super (...arguments);

    // Apply the selected property to the correct date
    let date = this.get ('date');

    if (isPresent (date)) {
      let month = date.toDate ().getMonth ();

      if (!!this._monthCurrent) {
        this._monthCurrent.classList.remove (CLASSNAME_MONTH_SELECTED);
        this._monthCurrent = null;
      }

      this._monthCurrent = this._monthElements[month];
      this._monthCurrent.classList.add (CLASSNAME_MONTH_SELECTED);
    }
  },

  actions: {
    select (month) {
      let change = this.get ('change');

      if (!!change) {
        change (month);
      }

      this.set ('show', false);
    }
  }
});
