'use strict';

module.exports = {
  name: require('./package').name,
<<<<<<< HEAD

  included (app) {
    this._super (...arguments);

    app.import ({
      development: 'node_modules/@material/top-app-bar/dist/mdc.topAppBar.js',
      production: 'node_modules/@material/top-app-bar/dist/mdc.topAppBar.min.js'
    });
  },

  optionsFor (type, options) {
    if (type === 'sass') {
      options.cacheInclude = options.cacheInclude || [];
      options.cacheInclude.push (/addon\.scss/);
      options.cacheInclude.push (/_app-theme\.scss/);

      options.cacheInclude.push (/@material\/animation/);
      options.cacheInclude.push (/@material\/base/);
      options.cacheInclude.push (/@material\/elevation/);
      options.cacheInclude.push (/@material\/ripple/);
      options.cacheInclude.push (/@material\/rtl/);
      options.cacheInclude.push (/@material\/theme/);
      options.cacheInclude.push (/@material\/top-app-bar/);
      options.cacheInclude.push (/@material\/typography/);
    }

    return options;
  }
=======
>>>>>>> 8e8504f4 (v3.18.0...v3.28.6)
};
