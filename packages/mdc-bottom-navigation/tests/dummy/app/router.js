import EmberRouter from '@ember/routing/router';
import config from 'dummy/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

<<<<<<< HEAD
Router.map(function() {
  this.route('library');
  this.route('favorites');
  this.route('music');
});
=======
Router.map(function () {});
>>>>>>> 07bd00a8 (v3.18.0...v3.28.6)
