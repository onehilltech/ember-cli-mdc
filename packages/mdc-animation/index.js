'use strict';

module.exports = {
  name: 'ember-cli-mdc-animation',

  included (app) {
    this._super (...arguments);

    app.import ({
      development: 'node_modules/@material/animation/dist/mdc.animation.js',
      production: 'node_modules/@material/animation/dist/mdc.animation.min.js'
    });
  },

  sassOptions (options) {
    options.cacheInclude = options.cacheInclude || [];
    options.cacheInclude.push (/addon.scss/);
    options.cacheInclude.push (/@material\/animation/);

    return options;
  }
};
