import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('links', function() {
    this.route('tab1');
    this.route('tab2');
    this.route('tab3');
  });
});

export default Router;
