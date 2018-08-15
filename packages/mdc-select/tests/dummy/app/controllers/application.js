import Controller from '@ember/controller';

export default Controller.extend({
  foodGroups: null,

  init () {
    this._super (...arguments);

    this.set ('foodGroups', [
      {value: '', disabled: true, selected: true},
      {value: 'grains', text: 'Bread, Cereal, Rice, and Pasta'},
      {value: 'vegetables', text: 'Vegetables'},
      {value: 'fruit', text: 'Fruit'}
    ]);
  }
});
