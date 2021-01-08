'use strict';
/* eslint-env node */

const fs = require ('fs-extra');

module.exports = {
  name:  require ('./package.json').name,

  included (app) {
    this._super.included.call (this, ...arguments);
  },

  /**
   * This method is used by other ember-cli-mdc packages to add sassOptions to an add-on.
   *
   * @param config
   * @param env
   * @param options
   */
  sassOptions (config, env, options = {}) {
    function watchPathIfExists (includePaths, path) {
      if (fs.pathExistsSync (path)) {
        if (!includePaths.includes (path))
          includePaths.push (path);
      }
    }

    Object.assign (options, {
      onlyIncluded: true,
    });

    if (!options.includePaths)
      options.includePaths = [];

    const { includePaths } = options;

    // Watch the following directories if they exists.
    watchPathIfExists (includePaths, 'app/styles');
    watchPathIfExists (includePaths, 'addon/styles');

    if (config.modulePrefix !== 'dummy') {
      if (!includePaths.includes ('app/styles'))
        includePaths.push ('app/styles');
    }
    else {
      if (!includePaths.includes ('tests/dummy/app/styles'))
        includePaths.push ('tests/dummy/app/styles');
    }

    if (env === 'test') {
      if (!includePaths.includes ('tests/dummy/app/styles'))
        includePaths.push ('tests/dummy/app/styles');
    }

    return options;
  }
};


