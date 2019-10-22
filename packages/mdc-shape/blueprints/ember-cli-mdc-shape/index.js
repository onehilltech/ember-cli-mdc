/* eslint-env node */

const { Blueprint } = require ('ember-cli-blueprint-helpers');

module.exports = Blueprint.extend ({
  packages: [
    {name: '@material/shape', target: '3.1.0'}
  ],

  addons: [
    {name: 'ember-cli-mdc-sass', blueprintOptions: {save: true}}
  ]
});
