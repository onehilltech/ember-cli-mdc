'use strict';

module.exports = {
  name: 'ember-cli-mdc-tab-indicator',

  included (app) {
    this._super (...arguments);

    app.import ({
      development: 'node_modules/@material/tab-indicator/dist/mdc.tabIndicator.js',
      production: 'node_modules/@material/tab-indicator/dist/mdc.tabIndicator.min.js'
    });
  },

  optionsFor (type, options) {
    if (type === 'sass') {
      options.cacheInclude = options.cacheInclude || [];
      options.cacheInclude.push (/addon\.scss/);
      options.cacheInclude.push (/_app-theme\.scss/);

      options.cacheInclude.push (/@material\/animation/);
      options.cacheInclude.push (/@material\/base/);
      options.cacheInclude.push (/@material\/tab-indicator/);
      options.cacheInclude.push (/@material\/theme/);
    }

    return options;
  }
};
