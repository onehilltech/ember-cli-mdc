import Component from '@ember/component';
import layout from '../templates/components/mdc-tab-ripple';

export default Component.extend({
  tagName: 'span',

  layout,

  classNames: ['mdc-tab__ripple']
});
