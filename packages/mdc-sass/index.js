'use strict';
/* eslint-env node */

const SassCompilerFactory = require ('broccoli-sass-source-maps');
const path = require ('path');
const VersionChecker = require ('ember-cli-version-checker');
const Funnel = require ('broccoli-funnel');
const mergeTrees = require ('broccoli-merge-trees');
const CoreObject = require ('core-object');
const nodeSass = require ('node-sass');
const { merge } = require ('lodash');

const SassPlugin = CoreObject.extend ({
  name: 'ember-cli-mdc-sass',

  ext: ['scss', 'sass'],

  context: null,

  toTree (tree, inputPath, outputPath, inputOptions) {
    // Get the sassOptions for the application, and merge the input options with
    // the application options.
    let appSassOptions = this.context.project.config (process.env.EMBER_ENV).sassOptions;
    let options = merge ({}, appSassOptions, inputOptions);

    let inputTrees;

    if (options.onlyIncluded) {
      inputTrees = [new Funnel(tree, {
        include: ['app/styles/**/*'],
        annotation: 'Funnel (styles)'
      })];
    }
    else {
      inputTrees = [tree];
    }

    if (options.includePaths) {
      inputTrees = inputTrees.concat(options.includePaths);
    }

    options.implementation = nodeSass;

    let SassCompiler = SassCompilerFactory (options.implementation);
    let ext = options.extension || 'scss';
    let paths = options.outputPaths;

    let trees = Object.keys (paths).map (file => {
      let input = path.join(inputPath, file + '.' + ext);
      let output = paths[file];
      let basename = path.basename (output, '.css');

      // Let's get the add on a chance to update the sass options since it may have
      // some infomration we can use to improve performance.

      if (this.context.app.name === basename && this.context.app.sassOptions) {
        options = this.context.app.sassOptions (options);
      }
      else {
        let addon = this.context.addonPackages[basename];

        if (addon && addon.sassOptions)
          options = addon.sassOptions (options);
      }

      return new SassCompiler(inputTrees, input, output, options);
    });

    if (options.passthrough) {
      trees.push (new Funnel(tree, options.passthrough));
    }

    return mergeTrees (trees);
  }
});

module.exports = {
  name:  'ember-cli-mdc-sass',

  setupPreprocessorRegistry (type, registry) {
    registry.add ('css', new SassPlugin ({context: this}));

    // prevent conflict with broccoli-sass if it's installed
    if (registry.remove)
      registry.remove ('css', 'broccoli-sass');
  },

  included (app) {
    this._super (...arguments);

    // see: https://github.com/ember-cli/ember-cli/issues/3718
    if (typeof app.import !== 'function' && app.app) {
      app = app.app;
    }

    this.app = app;
  }
};
