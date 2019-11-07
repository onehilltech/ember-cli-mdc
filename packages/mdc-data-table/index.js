'use strict';

module.exports = {
  name: require('./package').name,

  included (app) {
    this._super (...arguments);

    app.import ({
      development: 'node_modules/@material/data-table/dist/mdc.dataTable.js',
      production: 'node_modules/@material/data-table/dist/mdc.dataTable.min.js'
    });
  },

};
