import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  visible: false,
  value: null,

  init () {
    this._super (...arguments);
  },

  type: computed ('visible', function () {
    return this.get ('visible') ? 'text' : 'password';
  }),

  icon: computed ('visible', function () {
    return this.get ('visible') ? 'visibility' : 'visibility_off';
  }),

  actions: {
    toggleVisibility () {
      this.toggleProperty ('visible');
    }
  }
});
