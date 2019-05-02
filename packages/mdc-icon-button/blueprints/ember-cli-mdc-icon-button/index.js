/* eslint-env node */

const { Blueprint } = require ('ember-cli-blueprint-helpers');

module.exports = Blueprint.extend ({
  packages: [
    {name: '@material/icon-button', target: '2.0.0'}
  ],

  addons: [
    {name: 'ember-cli-mdc-button', target: '0.77.0-alpha.0'}
  ]
});
