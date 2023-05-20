import EmberRouter from '@ember/routing/router';
import config from 'dummy/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('links', function() {
    this.route('tab1');
    this.route('tab2');
    this.route('tab3');
  });
});
