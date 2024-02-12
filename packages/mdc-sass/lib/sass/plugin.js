const SassCompiler = require ('./compiler');

const path = require ('path');
const Funnel = require ('broccoli-funnel');
const mergeTrees = require ('broccoli-merge-trees');
const CoreObject = require ('core-object');
const { merge, find } = require ('lodash');
const fs = require ('fs-extra');

const MDC_PROJECT_REGEXP = /^ember-cli-mdc/;

module.exports = CoreObject.extend ({
  name: 'ember-cli-mdc-sass',

  ext: ['scss', 'sass'],

  context: null,

  toTree (tree, inputPath, outputPath, inputOptions) {
    // When working with a Material Design Component (MDC) project, the top-level
    // sass file will include the sass dependency files. We therefore only need to
    // convert the sass file for the project to a css file.

    let env = process.env.EMBER_ENV;
    let appSassOptions = this.context.app.project.config (env).sassOptions;
    let options = merge ({}, this.defaultSassOptions (env), appSassOptions, inputOptions);

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

    let ext = options.extension || 'scss';
    let paths = options.outputPaths;

    let trees = Object.keys (paths).map (file => {
      let input = path.join (inputPath, file + '.' + ext);
      let output = paths[file];

      // Let's get the add on a chance to update the sass options since it may have
      // some information we can use to improve performance.

      options.annotation = `Sass [${this.context.app.name}]`;
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
  },

  defaultSassOptions (env) {
    let options = {};

    function watchPathIfExists (includePaths, path) {
      if (fs.pathExistsSync (path)) {
        if (!includePaths.includes (path))
          includePaths.push (path);
      }
    }

    Object.assign (options, {

    });

    if (!options.includePaths)
      options.includePaths = [];

    const { includePaths } = options;

    // Watch the following directories if they exists.
    watchPathIfExists (includePaths, 'app/styles');
    watchPathIfExists (includePaths, 'addon/styles');
    watchPathIfExists (includePaths, 'node_modules');

    if (this.isEmberCLIAddon ()) {
      // We are compiling an add-on.
      if (!includePaths.includes ('tests/dummy/app/styles'))
        includePaths.push ('tests/dummy/app/styles');
    }
    else {
      // We are compiling an application.
      if (!includePaths.includes ('app/styles'))
        includePaths.push ('app/styles');
    }

    if (env === 'test') {
      if (!includePaths.includes ('tests/dummy/app/styles'))
        includePaths.push ('tests/dummy/app/styles');
    }

    return options;
  }
});
