import LinkComponent from '@ember/routing/link-component';
import RippleMixin from 'ember-cli-mdc-ripple/mixins/ripple';

import layout from '../templates/components/mdc-icon-button-link-to';

import { computed } from '@ember/object';

export default LinkComponent.extend (RippleMixin, {
  layout,

  classNames: ['mdc-icon-button', 'material-icons'],

  createRippleComponent: true,

  icon: computed ('params.[]', function () {
    return this.get ('params')[0];
  })
});
