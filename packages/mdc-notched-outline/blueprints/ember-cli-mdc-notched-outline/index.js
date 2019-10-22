/* eslint-env node */

const { Blueprint } = require ('ember-cli-blueprint-helpers');

module.exports = Blueprint.extend ({
  packages: [
    {name: '@material/notched-outline', target: '3.2.0'}
  ],

  addons: [
    {name: 'ember-cli-mdc-floating-label'}
  ]
});
