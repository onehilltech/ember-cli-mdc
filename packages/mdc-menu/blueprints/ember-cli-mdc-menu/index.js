/* eslint-env node */

const { Blueprint } = require ('ember-cli-blueprint-helpers');
const { version } = require ('../../package.json');
const target = require ('ember-cli-mdc-utils').target (version);

module.exports = Blueprint.extend ({
  packages: [
    {name: '@material/menu', target: '3.2.0'}
  ],

  addons: [
    {name: 'ember-cli-mdc-menu-surface', target},
    {name: 'ember-cli-mdc-ripple', target},
    {name: 'ember-cli-mdc-list', target},
  ]
});
