import Route from '@ember/routing/route';
import { A } from '@ember/array';

export default Route.extend ({
  setupController (controller) {
    this._super (...arguments);

    controller.setProperties ({
      basicChips: A ([
        {text: 'Chip content'},
        {text: 'Leading icon', icon: 'event'},
        {text: 'Trailing icon', icon: 'cancel', trailing: true}
      ]),

      choiceChips: A ([
        {id: 'extra_small', text: 'Extra Small'},
        {id: 'small', text: 'Small'},
        {id: 'medium', text: 'Medium'},
        {id: 'large', text: 'Large'},
        {id: 'extra_large', text: 'Extra Large'}
      ]),

      choice: 'medium',

      filterChips: A ([
        {id: 'fc-john', text: 'John', icon: 'face'},
        {id: 'fc-bob', text: 'Bob', icon: 'face'},
        {id: 'fc-alice', text: 'Alice'},
        {id: 'fc-susan', text: 'Susan'},
        {id: 'fc-jake', text: 'Jake'}
      ]),

      filtered: A ()
    });
  }
});
