'use strict';

module.exports = {
  name: 'ember-cli-mdc-icon',

  included (app) {
    this._super (...arguments);

    if (process.env.CORBER) {
      // We are using corber to build the application. This means that we need to
      // embed the icons in the application bundle.
      app.import ('node_modules/material-design-icons/iconfont/material-icons.css');
      app.import ('node_modules/material-design-icons/iconfont/MaterialIcons-Regular.eot', {destDir: 'assets/fonts/material-design-icons'});
      app.import ('node_modules/material-design-icons/iconfont/MaterialIcons-Regular.tff', {destDir: 'assets/fonts/material-design-icons'});
      app.import ('node_modules/material-design-icons/iconfont/MaterialIcons-Regular.woff', {destDir: 'assets/fonts/material-design-icons'});
      app.import ('node_modules/material-design-icons/iconfont/MaterialIcons-Regular.woff2', {destDir: 'assets/fonts/material-design-icons'});
    }
  },

  contentFor (type, config) {
    this._super (...arguments);

    if (type === 'head-footer') {
      if (!process.env.CORBER) {
        return '<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />';
      }
    }
  }
};
