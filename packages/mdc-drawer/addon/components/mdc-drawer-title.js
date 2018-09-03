import Component from '@ember/component';
import layout from '../templates/components/mdc-drawer-title';

export default Component.extend({
  layout,

  tagName: 'h3',

  classNames: ['mdc-drawer__title']
});
