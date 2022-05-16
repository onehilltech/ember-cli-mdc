/* eslint-env node */

const { Blueprint } = require('ember-cli-blueprint-helpers');

module.exports = Blueprint.extend({
  addons: [{ name: 'ember-modifier', target: '^2.0.0' }],

  packages: [{ name: '@material/base', target: '^14.0.0' }],
});
