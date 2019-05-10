/* eslint-env node */

const { Blueprint } = require ('ember-cli-blueprint-helpers');

module.exports = Blueprint.extend ({
  packages: [
    {name: '@material/tab', target: '2.0.0'}
  ],

  addons: [
    {name: 'ember-cli-mdc-ripple'},
    {name: 'ember-cli-mdc-typography'},
    {name: 'ember-cli-mdc-rtl'},
    {name: 'ember-cli-mdc-tab-indicator'}
  ]
});
