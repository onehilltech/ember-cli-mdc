/* eslint-env node */

const { Blueprint } = require ('ember-cli-blueprint-helpers');

module.exports = Blueprint.extend ({
  packages: [
    {name: '@material/tab-indicator', target: '1.1.0'}
  ],

  addons: [
    {name: 'ember-cli-mdc-icon'},
    {name: 'ember-cli-mdc-animation'},
    {name: 'ember-cli-mdc-base'},
    {name: 'ember-cli-mdc-theme'}
  ]
});
