import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('multipart');

  this.route('issues', function() {
    this.route('6');
    this.route('11');
  });
  this.route('icons');
});

export default Router;
