/* eslint-env node */

const { Blueprint } = require ('ember-cli-blueprint-helpers');

module.exports = Blueprint.extend ({
  packages: [
    {name: 'material-design-icons'}
  ],

  addons: [
    {name: 'ember-cli-mdc-theme', target: '^1.0.0'}
  ]
});

