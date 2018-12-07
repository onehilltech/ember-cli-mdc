import LinkComponent from '@ember/routing/link-component';
import layout from '../templates/components/mdc-icon-button-link-to';

import { computed } from '@ember/object';

export default LinkComponent.extend({
  layout,

  classNames: ['mdc-icon-button', 'material-icons'],

  icon: computed ('params.[]', function () {
    return this.get ('params')[0];
  })
});
