import Controller from '@ember/controller';

import { equal } from '@ember/object/computed';

export default Controller.extend({
  style: 'dismissible',
  modal: equal ('style', 'modal'),
});
