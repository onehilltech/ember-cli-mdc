import Component from '@ember/component';
import layout from '../templates/components/mdc-snackbar-label';

export default Component.extend({
  layout,

  classNames: ['mdc-snackbar__label'],

  didInsertElement () {
    this._super (...arguments);

    this.element.setAttribute ('role', 'status');
    this.element.setAttribute ('aria-live', 'polite');
  }
});
