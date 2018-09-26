import Route from '@ember/routing/route';
import { A } from '@ember/array';

export default Route.extend ({
  setupController (controller) {
    this._super (...arguments);

    controller.setProperties ({
      choiceChips: A ([
        {id: 'extra_small', text: 'Extra Small'},
        {id: 'small', text: 'Small'},
        {id: 'medium', text: 'Medium'},
        {id: 'large', text: 'Large'},
        {id: 'extra_large', text: 'Extra Large'}
      ]),

      choice: 'medium'
    });
  }
});
