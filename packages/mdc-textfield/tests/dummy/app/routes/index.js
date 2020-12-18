import Route from '@ember/routing/route';

export default Route.extend({
  setupController (controller) {
    this._super (...arguments);

    controller.validationMessages = {
      valueMissing: 'You must provide a value here.',
      rangeUnderflow: 'This number is too small!',
      rangeOverflow: 'This number is too big!'
    };

    controller.setProperties ({
      requirements: Object.freeze ([
        {description: 'Must be 8 characters or longer', pattern: /[\w\W]{8,}/},
        {description: 'Must have at least 1 lowercase letter', pattern: /[a-z]+/},
      ])
    })
  }
});
