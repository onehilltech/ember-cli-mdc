import Component from '@ember/component';
import layout from '../templates/components/mdc-linear-progress-bar-inner';

export default Component.extend({
  layout,

  tagName: 'span',

  classNames: ['mdc-linear-progress__bar-inner']
});
