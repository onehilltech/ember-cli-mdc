/* eslint-env node */

const { Blueprint } = require ('ember-cli-blueprint-helpers');

module.exports = Blueprint.extend ({
  packages: [
    {name: '@material/ripple', target: '3.2.0'}
  ],

  addons: [
    {name: 'ember-cli-mdc-animation'},
    {name: 'ember-cli-mdc-base'},
    {name: 'ember-cli-mdc-theme'}
  ]
});
