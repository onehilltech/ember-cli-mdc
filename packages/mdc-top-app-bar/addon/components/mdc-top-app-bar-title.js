import Component from '@ember/component';
import layout from '../templates/components/mdc-top-app-bar-title';

export default Component.extend({
  layout,

  tagName: 'span',

  classNames: ['mdc-top-app-bar__title']
});
