import Controller from '@ember/controller';

import { equal, not } from '@ember/object/computed';

export default Controller.extend({
  style: 'fixed',

  isShort: equal ('style', 'short'),
  notShort: not ('isShort'),

  actions: {

  }
});
