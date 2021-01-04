/* eslint-env node */

const { Blueprint } = require ('ember-cli-blueprint-helpers');
const { version } = require ('../../package.json');

module.exports = Blueprint.extend ({
  packages: [
    {name: '@material/floating-label', target: '^6.0.0'}
  ],

  addons: [
    {name: 'ember-cli-mdc-rtl', target: `^${version}`},
    {name: 'ember-cli-mdc-base', target: `^${version}`},
    {name: 'ember-cli-mdc-theme', target: `^${version}`},
    {name: 'ember-cli-mdc-typography', target: `^${version}`},
    {name: 'ember-cli-mdc-animation', target: `^${version}`},
    {name: '@ember/render-modifiers'}
  ]
});
