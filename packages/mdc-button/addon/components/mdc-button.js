import Component from '@ember/component';
import ButtonMixin from '../mixins/button';

import layout from '../templates/components/mdc-button';

export default Component.extend (ButtonMixin, {
  layout,

  tagName: 'button',

  createRippleComponent: true
});
