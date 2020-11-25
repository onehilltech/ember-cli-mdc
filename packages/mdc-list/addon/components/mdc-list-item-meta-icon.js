import ListItemMeta from './mdc-list-item-meta';
import layout from '../templates/components/mdc-list-item-meta-icon';

import { computed } from '@ember/object';

export default ListItemMeta.extend({
  layout,

  classNames: ['material-icons'],

  icon: computed ('params.[]', function () {
    return this.params[0];
  })
}).reopenClass ({
  positionalParams: 'params'
});
