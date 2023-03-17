'use strict';

const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');
const path = require ('path');

<<<<<<< HEAD
module.exports = function(defaults) {
  let app = new EmberAddon (defaults, {

=======
module.exports = function (defaults) {
  let app = new EmberAddon(defaults, {
    // Add options here
>>>>>>> 17f92f71 (v3.18.0...v3.28.6)
  });

  /*
    This build file specifies the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */

  const { maybeEmbroider } = require('@embroider/test-setup');
  return maybeEmbroider(app, {
    skipBabel: [
      {
        package: 'qunit',
      },
    ],
  });
};
