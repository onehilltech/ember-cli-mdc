'use strict';

module.exports = {
  name: require('./package').name,
<<<<<<< HEAD

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
=======
>>>>>>> 808d402c (v3.18.0...v3.28.6)
};
