/* global mdc */

import Component from '@ember/component';
import layout from '../templates/components/mdc-checkbox';

function noOp () {

}

export default Component.extend({
  layout,

  classNames: ['mdc-checkbox'],

  _checkbox: null,

  didInsertElement () {
    this._super (...arguments);

    this._checkbox = new mdc.checkbox.MDCCheckbox (this.element);
    this.getWithDefault ('initialized', noOp) (this._checkbox);
  }
});
