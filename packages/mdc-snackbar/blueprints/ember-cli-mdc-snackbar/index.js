/* eslint-env node */

const { Blueprint } = require ('ember-cli-blueprint-helpers');

module.exports = Blueprint.extend ({
  packages: [
    {name: '@material/snackbar', target: '2.0.0'}
  ],

  addons: [
    {name: 'ember-cli-mdc-animation'},
    {name: 'ember-cli-mdc-base'},
    {name: 'ember-cli-mdc-button'},
    {name: 'ember-cli-mdc-icon-button'},
    {name: 'ember-cli-mdc-rtl'},
    {name: 'ember-cli-mdc-theme'},
    {name: 'ember-cli-mdc-typography'}
  ]
});
