/* eslint-env node */

const { Blueprint } = require ('ember-cli-blueprint-helpers');

module.exports = Blueprint.extend ({
  packages: [
    {name: '@material/elevation', target: '3.1.0'}
  ],

  addons: [
    {name: 'ember-cli-mdc-animation', target: '^1.0.0'},
    {name: 'ember-cli-mdc-theme', target: '^1.0.0'}
  ]
});
