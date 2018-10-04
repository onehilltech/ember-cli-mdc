import Component from '@ember/component';
import layout from '../templates/components/mdc-step-label-indicator';

export default Component.extend({
  layout,

  tagName: 'span',

  classNames: ['mdc-step__label-indicator']
});
