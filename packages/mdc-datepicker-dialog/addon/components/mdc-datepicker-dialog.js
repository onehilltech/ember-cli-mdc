import Dialog from 'ember-cli-mdc-dialog/components/mdc-dialog';

import layout from '../templates/components/mdc-datepicker-dialog';

import moment from 'moment';

import { isPresent } from '@ember/utils';
import { A } from '@ember/array';

const CLASS_NAME_SELECTED = 'mdc-datepicker-dialog--selected';
const CLASS_NAME_INITIAL = 'mdc-datepicker-dialog--initial';

const CLASS_NAME_DISABLED = 'mdc-datepicker-dialog--disabled';
const CLASS_NAME_OTHER_MONTH = 'fc-other-month';

export default Dialog.extend ({
  layout,
  
  classNames: ['mdc-datepicker-dialog'],

  value: null,

  timezone: 'local',

  yearFormat: 'YYYY',

  dayFormat: 'ddd, MMM. Do',

  acceptButtonText: 'OK',

  closeButtonText: 'Cancel',

  $fc: null,

  dayNamesShort: A (['S', 'M', 'T', 'W', 'T', 'F', 'S']),

  _selectedElement: null,

  showMonthPicker: false,

  didInsertElement () {
    this._super (...arguments);

    this.$fc = this.$('.full-calendar');
  },

  willOpen () {
    this._super (...arguments);

    let value = this.get ('value');

    if (isPresent (value)) {
      // Move the calendar to the selected date.
      this.$fc.fullCalendar ('gotoDate', value);

      // Mark the date as selected.
      this.set ('selected', value);
      this._selectedElement = this._lookupDateElement (value);

      if (isPresent (this._selectedElement)) {
        this._selectedElement.classList.add (CLASS_NAME_SELECTED);
      }
    }
  },

  didClose ({detail: {action}}) {
    if (action === 'accept') {
      let selected = this.get ('selected');

      if (!!selected) {
        selected = selected.toDate ();
      }

      this.set ('value', selected);
    }

    this._super (...arguments);
  },

  _lookupDateElement (date) {
    const selector = `.fc-content-skeleton td[data-date="${moment (date).format ('YYYY-MM-DD')}"]`;
    return this.element.querySelector (selector);
  },

  actions: {
    viewRender (view) {
      const [monthDesc, yearDesc] = view.title.split (' ');
      const { intervalEnd: currentMonth } = view;

      this.setProperties ({ monthDesc, yearDesc, currentMonth });
    },

    dayRender (date, dayElement) {
      let srcDate = this.get ('timezone') === 'local' ? date.local () : date;

      let {min, max} = this.getProperties (['min', 'max']);
      let element = this._lookupDateElement (srcDate);

      if ((isPresent (min) && srcDate.isBefore (min)) || (isPresent (max) && srcDate.isAfter (max)))
      {
        // The current date is outside the min and max date. This means that the
        // date is disabled. We need to background and foreground day elements.

        dayElement[0].classList.add (CLASS_NAME_DISABLED);
        element.classList.add (CLASS_NAME_DISABLED);
      }
      else {
        // The current date is not disabled.
        dayElement[0].classList.remove (CLASS_NAME_DISABLED);
        element.classList.remove (CLASS_NAME_DISABLED);
      }

      let selected = this.get ('selected');

      if (isPresent (selected) && selected.isSame (srcDate, 'day')) {
        if (isPresent (this._selectedElement)) {
          this._selectedElement.classList.remove (CLASS_NAME_SELECTED);
        }

        element.classList.add (CLASS_NAME_SELECTED);
        this._selectedElement = element;
      }
      else {
        // This day is not selected. Remove the class, and release the element.
        element.classList.remove (CLASS_NAME_SELECTED);
      }
    },

    dayClick (date, event) {
      // Make sure we are allowed to accept clicking this element. Right now,
      // we do not support selecting days in the other month, or selecting day
      // that are disabled.

      const dayElement = event.target.classList.contains ('fc-day-top') ? event.target : event.target.parentElement;

      if (dayElement.classList.contains (CLASS_NAME_OTHER_MONTH) ||
        dayElement.classList.contains (CLASS_NAME_DISABLED))
      {
        return;
      }

      this.set ('selected', date.startOf ('day').local ());

      if (isPresent (this._selectedElement)) {
        this._selectedElement.classList.remove (CLASS_NAME_SELECTED);
      }

      this._selectedElement = dayElement;
      this._selectedElement.classList.add (CLASS_NAME_SELECTED);
    },

    today () {
      this.$fc.fullCalendar ('today');
    },

    prevMonth () {
      this.$fc.fullCalendar ('prev');
    },

    nextMonth () {
      this.$fc.fullCalendar ('next');
    },

    gotoMonth (month) {
      let currentMonth = this.get ('currentMonth');
      let date = moment (currentMonth).month (month);

      this.$fc.fullCalendar ('gotoDate', date);
    }
  }
});
