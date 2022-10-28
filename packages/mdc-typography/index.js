'use strict';

const { get } = require ('lodash');

module.exports = {
  name: require('./package').name,

  included (app) {
    this._super (...arguments);

    const { CORBER } = process.env;

    if (CORBER) {
      // Get the configuration for the current environment.
      const config = app.project.config (app.environment);
      const { linkFont = false } = get (config, 'ember-cli-mdc.typography', { });

      if (!linkFont) {
        // We are not dynamically loading the fonts. We need to bundle the Roboto fonts
        // with the application so they are useable.

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
      const lines = [];
      const { CORBER } = process.env;

      if (!CORBER) {
        const {
          dynamicLoad = true,
          preconnect = true,
          weights = [300, 400, 500, 700]
        } = get (config, 'ember-cli-mdc.typography', { });

        if (!dynamicLoad) {
          // We are not dynamically loading the fonts. We need to directly include the
          // link tags here so the Roboto fonts are useable in the application.

          this.ui.writeLine (`[${config.environment}]: Linking Roboto fonts with the application.`);

          if (preconnect)
            lines.push ('<link href="https://fonts.googleapis.com" rel="preconnect" />');

          const href = `https://fonts.googleapis.com/css?family=Roboto:${weights.join(',')}`;
          lines.push (`<link href="${href}" />`);
        }
      }

      return lines;
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
