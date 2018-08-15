import Component from '@ember/component';
import layout from '../templates/components/mdc-select-native-option';

export default Component.extend({
  layout,

  tagName: 'option',

  classNames: ['mdc-select__native-option'],

  attributeBindings: ['value','disabled','selected'],

  disabled: false,

  selected: false,

  value: null
});
