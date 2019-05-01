/* eslint-env node */

const { Blueprint } = require ('ember-cli-blueprint-helpers');

module.exports = Blueprint.extend ({
  packages: [
    {name: '@material/animation', target: '1.0.0'}
  ],

  addons: [
    {name: 'ember-cli-mdc-sass', blueprintOptions: {save: true}}
  ]
});
