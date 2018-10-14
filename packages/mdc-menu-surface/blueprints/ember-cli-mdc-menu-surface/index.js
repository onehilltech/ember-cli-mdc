/* eslint-env node */

const { Blueprint } = require ('ember-cli-blueprint-helpers');

module.exports = Blueprint.extend ({
  packages: [
    {name: '@material/menu-surface'}
  ],

  addons: [
    {name: 'ember-cli-mdc-elevation'},
    {name: 'ember-cli-mdc-rtl'},
    {name: 'ember-cli-mdc-shape'},
    {name: 'ember-cli-mdc-base'}
  ]
});
