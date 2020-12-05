export function initialize (application) {
  application.inject ('route', 'snackbar', 'service:snackbar');
  application.inject ('controller', 'snackbar', 'service:snackbar');}

export default {
  initialize
};
