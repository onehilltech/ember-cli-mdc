import ListItem from 'ember-cli-mdc-list/components/mdc-list-item';
import MenuItem from '../mixins/menu-item';

import layout from '../templates/components/mdc-menu-item';

import { computed } from '@ember/object';

export default ListItem.extend (MenuItem, {
  layout,

  text: computed ('params.[]', function () {
    return this.params[0];
  })
}).reopenClass ({
  positionalParams: 'params'
});
