import Component from '@ember/component';
import layout from '../templates/components/mdc-select-native-control';

export default Component.extend({
  layout,

  tagName: 'select',

  classNames: ['mdc-select__native-control'],

  attributeBindings: ['disabled']
});
