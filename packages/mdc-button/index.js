'use strict';

module.exports = {
  name: 'ember-cli-mdc-button',

  sassOptions (options) {
    options.cacheInclude = options.cacheInclude || [];
    options.cacheInclude.push (/addon\.scss/);
    options.cacheInclude.push (/_app-theme\.scss/);

    options.cacheInclude.push (/@material\/elevation/);
    options.cacheInclude.push (/@material\/ripple/);
    options.cacheInclude.push (/@material\/typography/);
    options.cacheInclude.push (/@material\/button/);

    return options;
  }
};
