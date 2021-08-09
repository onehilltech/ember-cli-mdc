"use strict";

module.exports = {
  name: require("./package").name,

  included(app) {
    this._super(...arguments);

    app.import({
      development: "node_modules/@material/tooltip/dist/mdc.tooltip.js",
      production: "node_modules/@material/tooltip/dist/mdc.tooltip.min.js",
    });
  },

  optionsFor(type, options) {
    if (type === "sass") {
      options.cacheInclude = options.cacheInclude || [];
      options.cacheInclude.push(/addon\.scss/);
      options.cacheInclude.push(/_app-theme\.scss/);

      options.cacheInclude.push(/@material\/animation/);
      options.cacheInclude.push(/@material\/base/);
      options.cacheInclude.push(/@material\/tooltip/);
      options.cacheInclude.push(/@material\/rtl/);
      options.cacheInclude.push(/@material\/theme/);
      options.cacheInclude.push(/@material\/typography/);
    }

    return options;
  },
};
