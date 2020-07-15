import Controller from '@ember/controller';
import Snackbar from 'ember-cli-mdc-snackbar/mixins/controller/snackbar';

export function initialize (application) {
  Controller.reopen (Snackbar);

  application.inject ('route', 'snackbar', 'service:snackbar');
  application.inject ('controller', 'snackbar', 'service:snackbar');
}

export default {
  name: 'mdc-snackbar',
  initialize
};
