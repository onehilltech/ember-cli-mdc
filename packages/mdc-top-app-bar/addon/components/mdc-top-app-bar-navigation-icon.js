import Component from '@ember/component';
import layout from '../templates/components/mdc-top-app-bar-navigation-icon';

export default Component.extend({
  layout,

  tagName: 'i',

  classNames: ['mdc-top-app-bar__navigation-icon', 'material-icons'],

  icon: 'menu'
});
