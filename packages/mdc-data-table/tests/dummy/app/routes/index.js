import Route from '@ember/routing/route';
import { A } from '@ember/array';

export default Route.extend({
  setupController (controller) {
    this._super (...arguments);

    controller.set ('selected', A (['u1']))
  }
});
