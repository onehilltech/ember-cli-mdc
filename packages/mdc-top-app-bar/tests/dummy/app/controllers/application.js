import Controller from '@ember/controller';

import { equal } from '@ember/object/computed';

export default Controller.extend({
  style: null,

  isShort: equal ('style', 'short'),

  actions: {
    navigation () {
      alert ('Navigation button clicked!');
    }
  }
});
