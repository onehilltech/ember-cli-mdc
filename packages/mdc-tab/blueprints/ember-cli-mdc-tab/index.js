/* eslint-env node */

const { Blueprint } = require ('ember-cli-blueprint-helpers');

module.exports = Blueprint.extend ({
  packages: [
    {name: '@material/tab', target: '3.2.0'}
  ],

  addons: [
    {name: 'ember-cli-mdc-ripple', target: '^1.0.0'},
    {name: 'ember-cli-mdc-typography', target: '^1.0.0'},
    {name: 'ember-cli-mdc-rtl', target: '^1.0.0'},
    {name: 'ember-cli-mdc-tab-indicator', target: '^1.0.0'}
  ]
});
