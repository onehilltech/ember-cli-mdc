import Component from '@ember/component';
import layout from '../templates/components/mdc-textfield-helper-text';

export default Component.extend({
  layout,

  tagName: 'p',

  classNames: ['mdc-text-field-helper-text'],

  classNameBindings: [
    'persistent:mdc-text-field-helper-text--persistent',
    'validation:mdc-text-field-helper-text--validation-msg'
  ],

  persistent: false,
  validation: false,

  didInsertElement () {
    this._super (...arguments);

    this.element.setAttribute ('aria-hidden', true);
  }
});
