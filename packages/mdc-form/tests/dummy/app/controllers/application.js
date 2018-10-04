import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { not } from '@ember/object/computed';

export default Controller.extend({
  visibility: false,

  email: null,

  valid: true,
  disabled: not ('valid'),

  password: null,
  passwordType: computed ('visibility', function () {
    return this.get ('visibility') ? 'text' : 'password';
  }),

  visibilityIcon: computed ('visibility', function () {
    return this.get ('visibility') ? 'visibility' : 'visibility_off';
  }),

  actions: {
    submit () {
      alert (`Email: ${this.get ('email')}\nPassword: ${this.get ('password')}`);
    },

    valid (valid) {
      console.log (valid);
    }
  }
});
