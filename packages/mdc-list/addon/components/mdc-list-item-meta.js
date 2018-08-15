import Component from '@ember/component';
import layout from '../templates/components/mdc-list-item-meta';

export default Component.extend({
  layout,

  tagName: 'span',

  classNames: ['mdc-list-item__meta'],

  didInsertElement () {
    this._super (...arguments);

    this.element.setAttribute ('aria-hidden', true);
  }
});
