import Route from '@ember/routing/route';

export default Route.extend({
  setupController (controller) {
    this._super (...arguments);

    controller.set ('buttons', [
      {id: 'yes', label: 'Yes', value: 'yes', disabled: true},
      {id: 'no', label: 'No', value: 'no'}
    ])
  }
});
