import Route from '@ember/routing/route';

export default Route.extend({
  setupController (controller) {
    this._super (...arguments);

    controller.setProperties ({
      foodGroups: [
        {value: '', disabled: true},
        {value: 'grains', text: 'Bread, Cereal, Rice, and Pasta'},
        {value: 'vegetables', text: 'Vegetables'},
        {value: 'fruit', text: 'Fruit'},
        {
          group: true, text: 'Other', options: [
            {value: 'meat', text: 'Beef, Pork, and Chicken', selected: true},
            {value: 'dairy', text: 'Milk, and Cheese'},
          ]
        }
      ]
    });
  }
});
