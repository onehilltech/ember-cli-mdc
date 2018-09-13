/* eslint-env node */

const { Blueprint } = require ('ember-cli-blueprint-helpers');

module.exports = Blueprint.extend ({
  packages: [
    {name: '@material/top-app-bar'}
  ],

  addons: [
    {name: 'ember-cli-mdc-elevation'},
    {name: 'ember-cli-mdc-ripple'},
    {name: 'ember-cli-mdc-rtl'},
    {name: 'ember-cli-mdc-typography'},
    {name: 'ember-cli-mdc-icon'}
  ]
});
