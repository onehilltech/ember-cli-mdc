import Component from '@ember/component';
import layout from '../templates/components/mdc-step-title-message';

export default Component.extend({
  layout,

  tagName: 'span',

  classNames: ['mdc-step__title-message']
});
