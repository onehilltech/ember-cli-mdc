/* eslint-env node */

const { Blueprint } = require ('ember-cli-blueprint-helpers');
const { version } = require ('../../package.json');

module.exports = Blueprint.extend ({
  packages: [
    {name: '@material/card', target: '^6.0.0'}
  ],

  addons: [
    {name: 'ember-cli-mdc-elevation', target: `^${version}`},
    {name: 'ember-cli-mdc-ripple', target: `^${version}`},
    {name: 'ember-cli-mdc-rtl', target: `^${version}`},
    {name: 'ember-cli-mdc-button', target: `^${version}`},
    {name: 'ember-cli-mdc-icon-button', target: `^${version}`}
  ]
});
