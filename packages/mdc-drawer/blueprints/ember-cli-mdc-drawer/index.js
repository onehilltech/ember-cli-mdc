/* eslint-env node */

const { Blueprint } = require ('ember-cli-blueprint-helpers');

module.exports = Blueprint.extend ({
  packages: [
    {name: '@material/drawer'}
  ],

  addons: [
    {name: 'ember-cli-mdc-list'},
    {name: 'ember-cli-mdc-base'},
    {name: 'ember-cli-mdc-elevation'}
  ]
});
