import Component from '@ember/component';
import layout from '../templates/components/mdc-top-app-bar-navigation-icon';

export default Component.extend({
  layout,

  tagName: 'a',

  classNames: ['mdc-top-app-bar__navigation-icon', 'material-icons'],

  icon: 'menu',

  didInsertElement () {
    this._super (...arguments);

    this.element.setAttribute ('href', '#');
  }
});
