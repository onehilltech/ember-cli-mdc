import LinkComponent from '@ember/routing/link-component';
import RippleMixin from 'ember-cli-mdc-ripple/mixins/ripple';

import { computed } from '@ember/object';

export default LinkComponent.extend (RippleMixin, {
  classNames: ['mdc-icon-button', 'material-icons'],

  createRippleComponent: true,

  unbounded: true,

  icon: computed ('params.[]', function () {
    return this.get ('params')[0];
  })
});
