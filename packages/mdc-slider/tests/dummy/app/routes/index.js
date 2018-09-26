import Route from '@ember/routing/route';
import EmberObject from '@ember/object';

export default Route.extend({
  setupController (controller) {
    this._super (...arguments);

    controller.setProperties ({
      continuous: EmberObject.create ({value: 10, selected: 30}),
      discrete: EmberObject.create ({value: null, selected: null}),
      step: EmberObject.create ({value: 24, selected: null}),
      markers: EmberObject.create ({value: 48, selected: null})
    });
  }
});
