import Controller from '@ember/controller';

export default Controller.extend ({
  actions: {
    snackbar (options) {
      this.snackbar.show (options);
    },

    undo () {
      alert ('Undo!');
    },

    dismiss () {
      alert ('Dismissed!');
    }
  }
});
