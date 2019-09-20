import Component from '@ember/component';
import layout from '../templates/components/mdc-select-option-group';

export default Component.extend({
  layout,

  tagName: 'optgroup',

  attributeBindings: ['label']
});
