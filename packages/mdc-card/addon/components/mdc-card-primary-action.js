import Component from '@ember/component';
import layout from '../templates/components/mdc-card-primary-action';

export default Component.extend({
  layout,

  classNames: ['mdc-card__primary-action'],

  didInsertElement () {
    this._super (...arguments);

    this.element.setAttribute ('tabindex', 0);
  }
});
