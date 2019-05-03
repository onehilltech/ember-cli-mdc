/* eslint-env node */

const { Blueprint } = require ('ember-cli-blueprint-helpers');

module.exports = Blueprint.extend ({
  packages: [
    {name: '@material/card', target: '2.0.0'}
  ],

  addons: [
    {name: 'ember-cli-mdc-elevation', target: '0.77.1-alpha.1'},
    {name: 'ember-cli-mdc-ripple', target: '0.77.1-alpha.1'},
    {name: 'ember-cli-mdc-rtl', target: '0.76.0'},
    {name: 'ember-cli-mdc-button', target: '0.77.1-alpha.1'},
    {name: 'ember-cli-mdc-icon-button', target: '0.77.1-alpha.1'},
  ]
});
