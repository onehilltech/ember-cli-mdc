import Component from '@ember/component';
import layout from '../templates/components/mdc-list-item-graphic';

export default Component.extend({
  layout,

  tagName: 'span',

  classNames: ['mdc-list-item__graphic'],

  didInsertElement () {
    this._super (...arguments);

    this.element.setAttribute ('aria-hidden', true);
  }
});
