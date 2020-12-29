'use strict';

module.exports = {
  name: require('./package').name,

  included (app) {
    this._super (...arguments);

    app.import ({
      development: 'node_modules/@material/icon-button/dist/mdc.iconButton.js',
      production: 'node_modules/@material/icon-button/dist/mdc.iconButton.min.js'
    });
  },

  optionsFor (type, options) {
    if (type === 'sass') {
      options.cacheInclude = options.cacheInclude || [];
      options.cacheInclude.push (/addon\.scss/);
      options.cacheInclude.push (/_app-theme\.scss/);

      options.cacheInclude.push (/@material\/animation/);
      options.cacheInclude.push (/@material\/base/);
      options.cacheInclude.push (/@material\/icon-button/);
      options.cacheInclude.push (/@material\/ripple/);
      options.cacheInclude.push (/@material\/theme/);
    }

    return options;
  }
};
