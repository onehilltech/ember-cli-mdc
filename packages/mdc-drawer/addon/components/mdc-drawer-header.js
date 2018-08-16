import Component from '@ember/component';
import layout from '../templates/components/mdc-drawer-header';

export default Component.extend({
  layout,

  tagName: 'header',
  classNames: ['mdc-drawer__header']
});
