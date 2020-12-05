export function initialize (application) {
  application.inject ('route', 'layout', 'service:layout');
  application.inject ('controller', 'layout', 'service:layout');
}

export default {
  initialize
};
