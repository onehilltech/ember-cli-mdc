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
    return this.visibility ? 'text' : 'password';
  }),

  visibilityIcon: computed ('visibility', function () {
    return this.visibility ? 'visibility' : 'visibility_off';
  }),

  actions: {
    submit () {
      alert (`Email: ${this.email}\nPassword: ${this.password}`);
    },

    valid (valid) {
      console.log (valid);
    }
  }
});
