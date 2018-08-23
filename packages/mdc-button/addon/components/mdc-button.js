import Component from '@ember/component';
import layout from '../templates/components/mdc-button';
import ButtonMixin from '../mixins/button';

export default Component.extend (ButtonMixin, {
  layout,

  tagName: 'button',

  attributeBindings: ['value', 'type']
});
