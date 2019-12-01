import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    show () {
      this.set ('message', 'Hello, World!');
    },

    undo () {
      alert ('Undo!');
    },

    send () {
      this.send ('snackbar', {
        message: 'This is a snackbar message!',
        dismissible: true,
        action: {
          text: 'Undo',
          handler ( ) {
            alert ('Undo!!');
          }
        }
      });
    }
  }
});
