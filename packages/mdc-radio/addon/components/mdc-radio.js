/* globals mdc */

import Component from '@ember/component';
import layout from '../templates/components/mdc-radio';
import { computed } from '@ember/object';

const { MDCRadio } = mdc.radio;

export default Component.extend({
  layout,

  classNames: ['mdc-radio'],

  /// The material radio component.
  _radio: null,

  controlId: computed ('id', function () {
    return `${this.id}-control`
  }),

  didInsertElement () {
    this._super (...arguments);

    this._radio = new MDCRadio (this.element);
  }
});
