import layout from '../templates/components/mdc-chip-link-to';
import LinkComponent from '@ember/routing/link-component';
import ChipMixin from '../mixins/chip';

import { computed } from '@ember/object';

export default LinkComponent.extend (ChipMixin, {
  layout,

  text: computed ('params.[]', function () {
    return this.params[0];
  }),

  activeClass: 'mdc-chip--active',
});
