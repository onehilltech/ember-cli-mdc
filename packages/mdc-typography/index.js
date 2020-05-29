'use strict';

const { get } = require ('lodash');

module.exports = {
  name: require('./package').name,

  included (app) {
    this._super (...arguments);

    if (process.env.CORBER) {
      // Get the configuration for the current environment.
      const config = app.project.config (app.environment);
      const typography = get (config, 'ember-cli-mdc.typography', {
        autoLinkFont: true
      });

      if (typography.autoLinkFont) {
        this.ui.writeLine (`[${config.environment}]: Bundling Roboto fonts with the application.`);

        // Import the font stylesheet.
        app.import ('vendor/assets/styles/roboto.css');

        // Import the Roboto fonts.
        app.import ('vendor/assets/fonts/roboto/Roboto-Bold.woff', {destDir: 'assets/fonts'});
        app.import ('vendor/assets/fonts/roboto/Roboto-Bold.woff2', {destDir: 'assets/fonts'});
        app.import ('vendor/assets/fonts/roboto/Roboto-Light.woff', {destDir: 'assets/fonts'});
        app.import ('vendor/assets/fonts/roboto/Roboto-Light.woff2', {destDir: 'assets/fonts'});
        app.import ('vendor/assets/fonts/roboto/Roboto-Medium.woff', {destDir: 'assets/fonts'});
        app.import ('vendor/assets/fonts/roboto/Roboto-Medium.woff2', {destDir: 'assets/fonts'});
        app.import ('vendor/assets/fonts/roboto/Roboto-Regular.woff', {destDir: 'assets/fonts'});
        app.import ('vendor/assets/fonts/roboto/Roboto-Regular.woff2', {destDir: 'assets/fonts'});
        app.import ('vendor/assets/fonts/roboto/Roboto-Thin.woff', {destDir: 'assets/fonts'});
        app.import ('vendor/assets/fonts/roboto/Roboto-Thin.woff2', {destDir: 'assets/fonts'});
      }
    }
  },

  contentFor (type, config) {
    this._super (...arguments);


    if (type === 'head-footer') {
      if (!process.env.CORBER) {
        const typography = get (config, 'ember-cli-mdc.typography', {
          autoLinkFont: true
        });

        if (typography.autoLinkFont) {
          this.ui.writeLine (`[${config.environment}]: Linking Roboto fonts with the application.`);
          return '<link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" rel="stylesheet" />';
        }
      }
    }
  },

  optionsFor (type, options) {
    if (type === 'sass') {
      options.cacheInclude = options.cacheInclude || [];
      options.cacheInclude.push (/addon\.scss/);
      options.cacheInclude.push (/@material\/typography/);
    }

    return options;
  }
};
