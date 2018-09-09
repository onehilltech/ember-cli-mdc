const SassCompiler = require ('./sass-compiler');
const path = require ('path');
const Funnel = require ('broccoli-funnel');
const mergeTrees = require ('broccoli-merge-trees');
const CoreObject = require ('core-object');
const nodeSass = require ('node-sass');
const { merge, find } = require ('lodash');

const MDC_PROJECT_REGEXP = /^ember-cli-mdc/;

module.exports = CoreObject.extend ({
  name: 'ember-cli-mdc-sass',

  ext: ['scss', 'sass'],

  context: null,

  toTree (tree, inputPath, outputPath, inputOptions) {
    // When working with a Material Design Component (MDC) project, the top-level
    // sass file will include the sass dependency files. We therefore only need to
    // convert the sass file for the project to a css file.

    let appSassOptions = this.context.app.project.config (process.env.EMBER_ENV).sassOptions;
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

    options.implementation = nodeSass;

    let ext = options.extension || 'scss';
    let paths = options.outputPaths;

    let trees = Object.keys (paths).map (file => {
      let input = path.join (inputPath, file + '.' + ext);
      let output = paths[file];

      // Let's get the add on a chance to update the sass options since it may have
      // some information we can use to improve performance.

      if (this.context.app.optionsFor)
        options = this.context.app.optionsFor ('sass', options);

      options.annotation = `SassCompiler [${this.context.app.name}]`;
      return new SassCompiler (inputTrees, input, output, options);
    });

    if (options.passthrough) {
      trees.push (new Funnel(tree, options.passthrough));
    }

    return mergeTrees (trees);
  },

  isEmberCLIAddon () {
    return this.context.project.isEmberCLIAddon ();
  },

  isMDCProject () {
    return MDC_PROJECT_REGEXP.test (this.context.app.name);
  },

  isSelf () {
    return this.context.project.name () === this.context.app.name;
  },

  isRootMDCProject () {
    const name = this.context.app.name;
    const result = find (this.context.project.addons, addon => {
      // We can skip the addon for the current context, or any addon that is not
      // a mdc project.

      return MDC_PROJECT_REGEXP.test (addon.name) && !!addon.pkg.devDependencies[name];
    });

    return !result;
  }
});
