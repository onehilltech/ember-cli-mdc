/* eslint-env node */

const { Blueprint } = require ('ember-cli-blueprint-helpers');
const { version } = require ('../../package.json');
const target = require ('ember-cli-mdc-utils').target (version);

module.exports = Blueprint.extend ({
  addons: [
    { name: 'ember-cli-mdc-base', target },
    { name: '@ember/render-modifiers', target: '^2.0.0' }
  ]
});
