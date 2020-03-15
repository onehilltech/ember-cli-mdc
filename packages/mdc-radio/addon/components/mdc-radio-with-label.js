import Component from '@ember/component';
import layout from '../templates/components/mdc-radio-with-label';

import { computed } from '@ember/object';

export default Component.extend({
  layout,

  classNames: ['mdc-radio-with-label'],

  controlId: computed ('id', function () {
    return `${this.id}-radio`
  }),

  radioControlId: computed ('controlId', function () {
    return `${this.controlId}-control`;
  })
});
