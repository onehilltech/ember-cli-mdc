/* eslint-env node */

const { Blueprint } = require ('ember-cli-blueprint-helpers');
const { version } = require ('../../package.json');
const target = require ('ember-cli-mdc-utils').target (version);

module.exports = Blueprint.extend ({
  packages: [
    {name: '@material/circular-progress', target: '^6.0.0'},
  ],

  addons: [
    {name: 'ember-cli-mdc-animation', target },
    {name: 'ember-cli-mdc-theme', target },
    {name: 'ember-cli-mdc-progress-indicator'},
    {name: 'ember-cli-custom-properties'}
  ]
});
