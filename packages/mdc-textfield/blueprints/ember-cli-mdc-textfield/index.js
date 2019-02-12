/* eslint-env node */

const { Blueprint } = require ('ember-cli-blueprint-helpers');

module.exports = Blueprint.extend ({
  packages: [
    {name: '@material/textfield', target: '0.43.1'}
  ],

  addons: [
    {name: 'ember-cli-mdc-animation'},
    {name: 'ember-cli-mdc-base'},
    {name: 'ember-cli-mdc-ripple'},
    {name: 'ember-cli-mdc-rtl'},
    {name: 'ember-cli-mdc-theme'},
    {name: 'ember-cli-mdc-typography'},
    {name: 'ember-cli-mdc-icon'},
    {name: 'ember-cli-mdc-floating-label'},
    {name: 'ember-cli-mdc-line-ripple'},
    {name: 'ember-cli-mdc-notched-outline'},
  ]
});
