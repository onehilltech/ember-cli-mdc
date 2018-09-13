/* eslint-env node */

const { Blueprint } = require ('ember-cli-blueprint-helpers');

module.exports = Blueprint.extend ({
  packages: [
    {name: '@material/line-ripple'}
  ],

  addons: [
    {name: 'ember-cli-mdc-animation'},
    {name: 'ember-cli-mdc-base'},
    {name: 'ember-cli-mdc-theme'}
  ]
});
