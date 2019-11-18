import Component from '@ember/component';
import layout from '../templates/components/mdc-datepicker-yearpicker';

import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import { isPresent } from '@ember/utils';

export default Component.extend({
  layout,

  classNames: ['mdc-datepicker-dialog__yearpicker'],
  classNameBindings: ['show:mdc-datepicker-dialog__yearpicker--show'],

  page: 0,

  years: computed ('{page,initialYear}', function () {
    const { page, initialYear } = this.getProperties (['page', 'initialYear']);
    let startYear = (initialYear - 4) + (page * 12);

    let years = [];

    for (let year = startYear, endYear = startYear + 12; year < endYear; ++ year)
      years.push (year);

    return years;
  }),

  didReceiveAttrs () {
    this._super (...arguments);

    const date = this.get ('date');
    return isPresent (date) ? this.set ('initialYear', date.year ()) : this.set ('initialYear', null);
  },

  actions: {
    next () {
      this.incrementProperty ('page');
    },

    prev () {
      this.decrementProperty ('page');
    },

    select (year) {
      let change = this.get ('change');

      if (!!change) {
        change (year);
      }

      this.set ('show', false);
    }
  }
});
