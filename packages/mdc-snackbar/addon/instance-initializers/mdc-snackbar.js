import Snackbar from 'ember-cli-mdc-snackbar/mixins/route/snackbar';

export function initialize (appInstance) {
  let appRoute = appInstance.lookup ('route:application');

  if (isPresent (appRoute)) {
    appRoute.reopen (Snackbar);
  }
  else {
    console.warn ('The ember application does not have an application route. The ember-cli-snackbar add-on cannot integrate the application-level snackbar.');
  }
}

export default {
  initialize
};
