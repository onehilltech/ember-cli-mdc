/* eslint-env node */

const { Blueprint } = require ('ember-cli-blueprint-helpers');

module.exports = Blueprint.extend ({
  packages: [
    {name: '@material/menu', target: '3.2.0'}
  ],

  addons: [
    {name: 'ember-cli-mdc-menu-surface', target: '^1.0.0'},
    {name: 'ember-cli-mdc-ripple', target: '^1.0.0'},
    {name: 'ember-cli-mdc-list', target: '^1.0.0'},
  ]
});
