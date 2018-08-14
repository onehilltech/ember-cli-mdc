import Controller from '@ember/controller';
import { equal } from '@ember/object/computed';

export default Controller.extend({
  show: null,

  showBasicDialog: equal ('show', 'basic'),
  showScrollableDialog: equal ('show', 'scrollable'),
  showEmphasizeDialog: equal ('show', 'emphasize'),

  actions: {
    accept () {
      alert ('Accept clicked!');
    },

    cancel () {
      alert ('Cancel clicked!');
    }
  }
});
