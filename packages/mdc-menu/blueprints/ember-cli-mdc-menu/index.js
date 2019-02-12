/* eslint-env node */

const { Blueprint } = require ('ember-cli-blueprint-helpers');

module.exports = Blueprint.extend ({
  packages: [
    {name: '@material/menu', target: '0.43.0'}
  ],

  addons: [
    {name: 'ember-cli-mdc-menu-surface'},
    {name: 'ember-cli-mdc-ripple'},
    {name: 'ember-cli-mdc-list'},
  ]
});
