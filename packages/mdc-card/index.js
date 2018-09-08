'use strict';

module.exports = {
  name: 'ember-cli-mdc-card',

  sassOptions (options) {
    options.cacheInclude = options.cacheInclude || [];
    options.cacheInclude.push (/addon\.scss/);
    options.cacheInclude.push (/_app-theme\.scss/);

    options.cacheInclude.push (/@material\/animation/);
    options.cacheInclude.push (/@material\/base/);
    options.cacheInclude.push (/@material\/button/);
    options.cacheInclude.push (/@material\/card/);
    options.cacheInclude.push (/@material\/elevation/);
    options.cacheInclude.push (/@material\/icon-button/);
    options.cacheInclude.push (/@material\/ripple/);
    options.cacheInclude.push (/@material\/rtl/);
    options.cacheInclude.push (/@material\/typography/);

    return options;
  }
};

