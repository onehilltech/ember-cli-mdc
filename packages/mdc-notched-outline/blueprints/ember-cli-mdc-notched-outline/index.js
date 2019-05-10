/* eslint-env node */

const { Blueprint } = require ('ember-cli-blueprint-helpers');

module.exports = Blueprint.extend ({
  packages: [
    {name: '@material/notched-outline', target: '1.1.1'}
  ],

  addons: [
    {name: 'ember-cli-mdc-floating-label'}
  ]
});
