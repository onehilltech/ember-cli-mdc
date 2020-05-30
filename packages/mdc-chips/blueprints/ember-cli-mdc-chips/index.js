/* eslint-env node */

const { Blueprint } = require ('ember-cli-blueprint-helpers');

module.exports = Blueprint.extend ({
  packages: [
    {name: '@material/chips', target: '3.2.0'}
  ],

  addons: [
    {name: 'ember-cli-mdc-checkbox', target: '^1.0.0'},
    {name: 'ember-cli-mdc-base', target: '^1.0.0'},
    {name: 'ember-cli-mdc-textfield', target: '^1.0.0'}
  ]
});
