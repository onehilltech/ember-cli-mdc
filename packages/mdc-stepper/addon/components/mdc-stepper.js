import Component from '@ember/component';
import layout from '../templates/components/mdc-stepper';

import { MDCStepper } from '../-lib';

export default Component.extend({
  layout,

  tagName: 'ul',

  classNames: ['mdc-stepper'],

  classNameBindings: [
    'linear:mdc-stepper--linear',
    'horizontal:mdc-stepper--horizontal',
    'feedback:mdc-stepper--feedback'
  ],

  _stepper: null,

  linear: false,

  horizontal: false,

  feedback: false,

  didInsertElement () {
    this._super (...arguments);

    this._stepper = new MDCStepper (this.element);
  },

  willDestroyElement () {
    this._super (...arguments);

    this._stepper.destroy ();
  }
});
