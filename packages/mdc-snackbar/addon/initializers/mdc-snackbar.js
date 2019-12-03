import Controller from '@ember/controller';
import Snackbar from 'ember-cli-mdc-snackbar/mixins/controller/snackbar';

export function initialize (/* application */) {
  Controller.reopen (Snackbar);
}

export default {
  initialize
};
