/* eslint-env node */

const { Blueprint } = require ('ember-cli-blueprint-helpers');
const { version } = require ('../../package.json');

module.exports = Blueprint.extend ({
  packages: [
    {name: '@material/select', target: '^6.0.0'}
  ],

  addons: [
    {name: 'ember-cli-mdc-floating-label', target: `^${version}`},
    {name: 'ember-cli-mdc-line-ripple', target: `^${version}`},
    {name: 'ember-cli-mdc-notched-outline', target: `^${version}`},
    {name: 'ember-cli-mdc-rtl', target: `^${version}`},
    {name: 'ember-cli-mdc-typography', target: `^${version}`},
    {name: 'ember-cli-mdc-menu', target: `^${version}`},
    {name: 'ember-cli-mdc-shape', target: `^${version}`},
    {name: 'ember-cli-custom-properties'}
  ]
});
