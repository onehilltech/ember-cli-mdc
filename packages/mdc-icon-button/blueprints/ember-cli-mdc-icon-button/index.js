/* eslint-env node */

const { Blueprint } = require ('ember-cli-blueprint-helpers');

module.exports = Blueprint.extend ({
  packages: [
    {name: '@material/icon-button', target: '3.2.0'}
  ],

  addons: [
    {name: 'ember-cli-mdc-button', target: '^1.0.0'}
  ]
});
