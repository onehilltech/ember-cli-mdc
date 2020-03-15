import Component from '@ember/component';
import layout from '../templates/components/mdc-radio-native-control';

export default Component.extend({
  tagName: 'input',

  layout,

  classNames: ['mdc-radio__native-control'],

  attributeBindings: ['type', 'name', 'checked', 'disabled', 'form', 'value', 'required'],

  type: 'radio'
});
