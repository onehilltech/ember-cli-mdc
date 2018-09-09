'use strict';

module.exports = {
  name: 'ember-cli-mdc-layout-grid',

  optionsFor (type, options) {
    if (type === 'sass') {
      options.cacheInclude = options.cacheInclude || [];
      options.cacheInclude.push (/addon\.scss/);

      options.cacheInclude.push (/@material\/layout-grid/);
    }

    return options;
  }
};
