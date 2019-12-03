import Snackbar from 'ember-cli-mdc-snackbar/mixins/route/snackbar';

export function initialize (appInstance) {
  let appRoute = appInstance.lookup ('route:application');
  appRoute.reopen (Snackbar);
}

export default {
  initialize
};
