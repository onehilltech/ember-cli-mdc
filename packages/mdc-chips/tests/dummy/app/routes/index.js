import Route from '@ember/routing/route';
import { A } from '@ember/array';

export default Route.extend ({
  setupController (controller) {
    this._super (...arguments);

    controller.setProperties ({
      chips: A ([
        {text: 'Chip content', trailingIcon: 'cancel'},
        {text: 'Leading icon', leadingIcon: 'event', trailingIcon: 'cancel'},
        {text: 'Trailing icon', trailingIcon: 'cancel'}
      ]),

      customKeyChips: A ([
        {name: 'John Doe', leadingIcon: 'account_circle', trailingIcon: 'cancel'},
        {name: 'Jane Doe', leadingIcon: 'account_circle', trailingIcon: 'cancel'},
        {name: 'Tom Thumb', leadingIcon: 'account_circle', trailingIcon: 'cancel'}
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
        {id: 'fc-john', text: 'John', leadingIcon: 'face', checked: true},
        {id: 'fc-bob', text: 'Bob', leadingIcon: 'face', checked: true},
        {id: 'fc-alice', text: 'Alice', checked: true},
        {id: 'fc-susan', text: 'Susan', checked: true},
        {id: 'fc-jake', text: 'Jake', checked: true}
      ]),

      filtered: A ()
    });
  }
});
