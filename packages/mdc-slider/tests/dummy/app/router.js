import EmberRouter from '@ember/routing/router';
import config from 'dummy/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

<<<<<<< HEAD
Router.map(function() {
  this.route('issues', function() {
    this.route('7');
  });
});
=======
Router.map(function () {});
>>>>>>> b8fdaabb (v3.18.0...v3.28.6)
