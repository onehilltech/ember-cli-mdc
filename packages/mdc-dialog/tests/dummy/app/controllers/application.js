import Controller from '@ember/controller';
import { equal } from '@ember/object/computed';

export default Controller.extend({
  show: null,

  showBasicDialog: equal ('show', 'basic'),
  showScrollableDialog: equal ('show', 'scrollable'),
  showDefaultDialog: equal ('show', 'default'),

  actions: {
    accept () {
      alert ('Accept clicked!');
    },

    close () {
      alert ('Cancel clicked!');
    }
  }
});
