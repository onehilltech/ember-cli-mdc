import ListItemGraphic from './mdc-list-item-graphic';
import layout from '../templates/components/mdc-list-item-graphic-icon';

import { computed } from '@ember/object';

export default ListItemGraphic.extend({
  layout,

  classNames: ['material-icons'],

  params: null,

  icon: computed ('params.[]', function () {
    return this.get ('params')[0];
  })
}).reopenClass ({
  positionalParams: 'params'
});
