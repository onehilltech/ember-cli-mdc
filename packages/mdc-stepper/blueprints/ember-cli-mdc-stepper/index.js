/* eslint-env node */

const { Blueprint } = require ('ember-cli-blueprint-helpers');

module.exports = Blueprint.extend ({
  packages: [
    {name: '@material/dom'}
  ],

  addons: [
    {name: 'ember-cli-mdc-button'}
  ]
});
