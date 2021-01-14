/* eslint-env node */

const { Blueprint } = require ('ember-cli-blueprint-helpers');
const { version } = require ('../../package.json');

module.exports = Blueprint.extend ({
  packages: [
    {name: '@material/icon-button', target: '^9.0.0'}
  ],

  addons: [
    {name: 'ember-cli-mdc-button', target: `^${version}`},
    {name: '@ember/render-modifiers'}
  ]
});
