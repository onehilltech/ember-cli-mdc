import Route from '@ember/routing/route';
import { A } from '@ember/array';

export default class IndexRouter extends Route {
  setupController (controller) {
    super.setupController (...arguments);

    controller.foodGroups = A ([
      {value: 'grains', text: 'Bread, Cereal, Rice, and Pasta'},
      {value: 'vegetables', text: 'Vegetables', disabled: true},
      {value: 'fruit', text: 'Fruit'}
    ]);

    controller.actors = A ([
      {id: 1, name: 'Kevin Hart'},
      {id: 2, name: 'Dwayne Johnson'},
      {id: 3, name: 'Tom Hanks'}
    ])

    controller.value = controller.foodGroups.objectAt (0);
  }
}
