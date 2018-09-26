import Component from '@ember/component';
import layout from '../templates/components/mdc-slider-pin-value-marker';

export default Component.extend({
  layout,

  tagName: 'span',

  classNames: ['mdc-slider__pin-value-marker']
});
