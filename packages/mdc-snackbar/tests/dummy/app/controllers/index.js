import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class IndexController extends Controller {
  @service
  snackbar;

  @action
  showMessage () {
    this.snackbar.show ({
      message: 'Hello, World!',
      action: {
        label: 'Show Me',
        closing () {
          console.log ('Closing dialog from action click.')
        },
        closed () {
          console.log ('Closed dialog from action click.')
        }
      },
      dismiss: {
        icon: 'delete',
        closing () {
          console.log ('Closing dialog from dismiss click.')
        },

        closed  () {
          console.log ('Closed dialog from dismiss click.')
        }
      }
    });
  }
}
