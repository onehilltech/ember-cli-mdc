import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend ({
  snackbar: service (),

  actions: {
    snackbar () {
      this.snackbar.show ({  message: 'Hello, World!' });
    },

    undo () {
      alert ('Undo!');
    },

    send () {
      this.snackbar ({
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
