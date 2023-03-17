import EmberRouter from '@ember/routing/router';
import config from 'dummy/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

<<<<<<< HEAD
Router.map(function() {
  this.route('inbox');
  this.route('star');
  this.route('sent');
  this.route('drafts');
  this.route('all');
  this.route('spam');
  this.route('trash');
});
=======
Router.map(function () {});
>>>>>>> 9df353ef (v3.18.0...v3.28.6)
