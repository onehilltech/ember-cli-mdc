import Controller from '@ember/controller';

import { equal } from '@ember/object/computed';

export default Controller.extend({
  style: 'permanent',
  permanent: equal ('style', 'permanent'),
});
