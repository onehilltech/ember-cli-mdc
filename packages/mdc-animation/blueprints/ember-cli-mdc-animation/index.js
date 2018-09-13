/* eslint-env node */

const { Blueprint } = require ('ember-cli-blueprint-helpers');

module.exports = Blueprint.extend ({
  packages: [
    {name: '@material/animation'}
  ],

  addons: [
    {name: 'ember-cli-mdc-sass', blueprintOptions: {save: true}}
  ]
});
