import EmberRouter from '@ember/routing/router';
import config from './config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('inbox');
  this.route('star');
  this.route('sent');
  this.route('drafts');
  this.route('all');
  this.route('spam');
  this.route('trash');
});
