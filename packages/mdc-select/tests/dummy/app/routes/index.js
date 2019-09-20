import Route from '@ember/routing/route';

export default Route.extend({
  setupController (controller) {
    this._super (...arguments);

    controller.set ('foodGroups', [
      {value: '', disabled: true},
      {value: 'grains', text: 'Bread, Cereal, Rice, and Pasta', selected: true},
      {value: 'vegetables', text: 'Vegetables'},
      {value: 'fruit', text: 'Fruit'}
    ]);
  }
});
