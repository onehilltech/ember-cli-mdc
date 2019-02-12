/* eslint-env node */

const { Blueprint } = require ('ember-cli-blueprint-helpers');

module.exports = Blueprint.extend ({
  packages: [
    {name: '@material/icon-button', target: '0.43.1'}
  ],

  addons: [
    {name: 'ember-cli-mdc-ripple'},
    {name: 'ember-cli-mdc-icon'}
  ]
});
