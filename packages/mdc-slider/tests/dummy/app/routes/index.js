import Route from '@ember/routing/route';
import EmberObject from '@ember/object';

export default Route.extend({
  setupController (controller) {
    this._super (...arguments);

    controller.setup ();
  }
});
