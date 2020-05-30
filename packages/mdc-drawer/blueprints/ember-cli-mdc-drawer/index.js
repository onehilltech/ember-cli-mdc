/* eslint-env node */

const { Blueprint } = require ('ember-cli-blueprint-helpers');

module.exports = Blueprint.extend ({
  packages: [
    {name: '@material/drawer', target: '3.2.0'}
  ],

  addons: [
    {name: 'ember-cli-mdc-list', target: '^1.0.0'},
    {name: 'ember-cli-mdc-base', target: '^1.0.0'},
    {name: 'ember-cli-mdc-elevation', target: '^1.0.0'}
  ]
});
