import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    show () {
      this.set ('message', 'Hello, World!');
    },

    dismiss () {
      alert ('Dismiss!');
    }
  }
});
