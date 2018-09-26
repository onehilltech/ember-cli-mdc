import Component from '@ember/component';
import layout from '../templates/components/mdc-slider-thumb';

import { computed } from '@ember/object';

export default Component.extend({
  layout,

  tagName: 'svg',

  classNames: ['mdc-slider__thumb'],

  attributeBindings: ['height', 'width'],

  height: 21,

  width: 21,

  r: 7.875,

  cx: computed ('width', function () {
    return this.get ('width') / 2;
  }),

  cy: computed ('height', function () {
    return this.get ('height') / 2;
  })
});
