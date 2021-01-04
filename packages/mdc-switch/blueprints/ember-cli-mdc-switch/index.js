/* eslint-env node */

const { Blueprint } = require ('ember-cli-blueprint-helpers');
const { version } = require ('../../package.json');

module.exports = Blueprint.extend ({
  packages: [
    {name: '@material/switch', target: '^6.0.0'}
  ],

  addons: [
    {name: 'ember-cli-mdc-form-field', target: `^${version}`},
    {name: 'ember-cli-mdc-elevation', target: `^${version}`},
    {name: 'ember-cli-mdc-rtl', target: `^${version}`},
    {name: '@ember/render-modifiers'}
  ]
});
