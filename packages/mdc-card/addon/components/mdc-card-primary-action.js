import Component from '@ember/component';

export default Component.extend({
  layout,

  classNames: ['mdc-card__primary-action'],

  didInsertElement () {
    this._super (...arguments);

    this.element.setAttribute ('tabindex', 0);
  }
});
