import Component from '@ember/component';
import layout from '../templates/components/mdc-step-button';
import StepButtonMixin from '../mixins/step-button';

export default Component.extend (StepButtonMixin, {
  layout,

  tagName: 'button',

  attributeBindings: ['action:data-mdc-step-action']
});
