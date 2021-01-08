/* eslint-env node */

const { Blueprint } = require ('ember-cli-blueprint-helpers');

module.exports = Blueprint.extend ({
  addons: [
    {name: 'ember-modifier'},
  ],

  packages: [
    {name: '@material/base', target: '^9.0.0'}
  ]
});
