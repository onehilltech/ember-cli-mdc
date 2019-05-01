/* eslint-env node */

const { Blueprint } = require ('ember-cli-blueprint-helpers');

module.exports = Blueprint.extend ({
  packages: [
    {name: '@material/shape', target: '1.1.1'}
  ],

  addons: [
    {name: 'ember-cli-mdc-sass', blueprintOptions: {save: true}}
  ]
});
