import Component from '@ember/component';
import layout from '../templates/components/mdc-list-item-text';

export default Component.extend({
  layout,

  tagName: 'span',

  classNames: ['mdc-list-item__text']
});
