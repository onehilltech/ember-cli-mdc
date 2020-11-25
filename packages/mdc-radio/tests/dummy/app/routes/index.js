import Route from '@ember/routing/route';

export default Route.extend({
  setupController (controller) {
    this._super (...arguments);

    controller.set ('buttons', [
      {id: 'yes', label: 'Yes', value: 'yes'},
      {id: 'no', label: 'No', value: 'no'},
      {id: 'maybe', label: 'Maybe', value: 'maybe', disabled: true}
    ])
  }
});
