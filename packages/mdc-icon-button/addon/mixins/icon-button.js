import Mixin from '@ember/object/mixin';
import RippleMixin from 'ember-cli-mdc-ripple/mixins/ripple';

export default Mixin.create (RippleMixin, {
  classNames: ['mdc-icon-button', 'material-icons'],

  attributeBindings: [
    'disabled',
    'value',
    'type',
    'form'
  ],

  createRippleComponent: true,
  unbounded: true,
});
