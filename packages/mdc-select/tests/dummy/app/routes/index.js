import Route from '@ember/routing/route';

export default Route.extend({
  setupController (controller) {
    this._super (...arguments);

    controller.set ('foodGroups', [
      {value: '', disabled: true, selected: true},
      {value: 'grains', text: 'Bread, Cereal, Rice, and Pasta'},
      {value: 'vegetables', text: 'Vegetables'},
      {value: 'fruit', text: 'Fruit'}
    ]);
  }
});
