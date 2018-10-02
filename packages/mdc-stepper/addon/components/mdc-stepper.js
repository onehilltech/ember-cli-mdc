import Component from '@ember/component';
import layout from '../templates/components/mdc-stepper';

import { MDCStepper } from '../-lib';

import { isPresent } from '@ember/utils';

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

  didUpdateAttrs () {
    this._super (...arguments);

    let error = this.get ('error');

    if (isPresent (error)) {
      this._stepper.error (error);
    }
  },

  willDestroyElement () {
    this._super (...arguments);

    this._stepper.destroy ();
  }
});
