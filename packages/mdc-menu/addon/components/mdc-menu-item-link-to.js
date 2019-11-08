import ListItemLinkTo from 'ember-cli-mdc-list/components/mdc-list-item-link-to';
import MenuItem from '../mixins/menu-item';

import layout from '../templates/components/mdc-menu-item-link-to';

import { computed } from '@ember/object';

export default ListItemLinkTo.extend (MenuItem, {
  layout,

  text: computed ('params.[]', function () {
    return this.get ('params')[0];
  })
}).reopenClass ({
  positionalParams: 'params'
});
