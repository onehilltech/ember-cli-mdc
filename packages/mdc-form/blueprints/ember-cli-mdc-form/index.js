/* eslint-env node */

const { Blueprint } = require ('ember-cli-blueprint-helpers');

module.exports = Blueprint.extend ({
  addons: [
    {name: '@ember/render-modifiers', target: '^1.0.0'},
  ]
});
