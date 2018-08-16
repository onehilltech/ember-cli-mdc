import Component from '@ember/component';
import layout from '../templates/components/mdc-drawer-content';

export default Component.extend({
  layout,

  tagName: 'nav',

  classNames: ['mdc-drawer__content']
});
