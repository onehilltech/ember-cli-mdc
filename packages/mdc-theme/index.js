'use strict';

const { get } = require ('lodash');

module.exports = {
  name: 'ember-cli-mdc-theme',

  contentFor (type, config) {
    if (type === 'head') {
      let themeColor = get (config, 'ember-cli-mdc.themeColor');

      if (themeColor) {
        return `<meta name="theme-color" content="${themeColor}" />
               <meta name="msapplication-navbutton-color" content="${themeColor}" />
               <meta name="apple-mobile-web-app-status-bar-style" content="${themeColor}" />`;
      }
    }
  },

  sassOptions (options) {
    options.cacheInclude = options.cacheInclude || [];
    options.cacheInclude.push (/addon.scss/);
    options.cacheInclude.push (/_app-theme.scss/);
    options.cacheInclude.push (/@material\/theme/);

    return options;
  }
};
