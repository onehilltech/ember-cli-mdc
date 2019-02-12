/* eslint-env node */

const { Blueprint } = require ('ember-cli-blueprint-helpers');

module.exports = Blueprint.extend ({
  packages: [
    {name: '@material/select', target: '0.43.0'}
  ],

  addons: [
    {name: 'ember-cli-mdc-floating-label'},
    {name: 'ember-cli-mdc-line-ripple'},
    {name: 'ember-cli-mdc-notched-outline'},
    {name: 'ember-cli-mdc-ripple'},
    {name: 'ember-cli-mdc-rtl'},
    {name: 'ember-cli-mdc-typography'}
  ]
});
