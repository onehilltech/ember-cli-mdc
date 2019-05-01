import Component from '@ember/component';
import layout from '../templates/components/mdc-foo';

import Ripple from 'ember-cli-mdc-ripple/mixins/ripple';

export default Component.extend (Ripple, {
  layout,

  tagName: 'span',

  createRippleComponent: true
});
