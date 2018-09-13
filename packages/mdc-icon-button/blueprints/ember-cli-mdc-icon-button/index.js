/* eslint-env node */

const { Blueprint } = require ('ember-cli-blueprint-helpers');

module.exports = Blueprint.extend ({
  packages: [
    {name: '@material/icon-button'}
  ],

  addons: [
    {name: 'ember-cli-mdc-ripple'},
    {name: 'ember-cli-mdc-icon'}
  ]
});
