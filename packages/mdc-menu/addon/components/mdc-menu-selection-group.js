import Component from '@ember/component';
import layout from '../templates/components/mdc-menu-selection-group';

export default Component.extend({
  tagName: 'ul',

  layout,

  classNames: ['mdc-menu__selection-group']
});
