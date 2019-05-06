import Component from '@ember/component';
import layout from '../templates/components/mdc-list-divider';

export default Component.extend({
  layout,

  classNames: ['mdc-list-divider'],

  classNameBindings: [
    'padded:mdc-list-divider--padded',
    'inset:mdc-list-divider--inset'
  ],

  padded: false,

  inset: false,

  didInsertElement () {
    this._super (...arguments);

    this.element.setAttribute ('role', 'separator');
  }
});
