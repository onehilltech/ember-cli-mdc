/* eslint-env node */

const { Blueprint } = require ('ember-cli-blueprint-helpers');

module.exports = Blueprint.extend ({
  packages: [
    {name: '@material/list', target: '3.2.0'}
  ],

  addons: [
    {name: 'ember-cli-mdc-ripple', target: '^1.0.0'},
    {name: 'ember-cli-mdc-rtl', target: '^1.0.0'},
    {name: 'ember-cli-mdc-typography', target: '^1.0.0'},
    {name: 'ember-cli-mdc-icon', target: '^1.0.0'}
  ]
});
