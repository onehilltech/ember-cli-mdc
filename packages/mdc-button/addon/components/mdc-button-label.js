import Component from '@ember/component';
import layout from '../templates/components/mdc-button-label';

export default Component.extend({
  layout,

  tagName: 'span',

  classNames: ['mdc-button__label']
});
