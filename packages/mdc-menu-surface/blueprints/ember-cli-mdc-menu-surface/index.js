/* eslint-env node */

const { Blueprint } = require ('ember-cli-blueprint-helpers');

module.exports = Blueprint.extend ({
  packages: [
    {name: '@material/menu-surface', target: '3.2.0'}
  ],

  addons: [
    {name: 'ember-cli-mdc-elevation', target: '^1.0.0'},
    {name: 'ember-cli-mdc-rtl', target: '^1.0.0'},
    {name: 'ember-cli-mdc-shape', target: '^1.0.0'},
    {name: 'ember-cli-mdc-base', target: '^1.0.0'}
  ]
});
