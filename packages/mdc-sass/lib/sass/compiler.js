const CachingWriter = require ('broccoli-caching-writer');
const path = require ('path');
const { ensureDirSync, writeFileSync } = require ('fs-extra');

Compiler.prototype = Object.create (CachingWriter.prototype);
Compiler.prototype.constructor = Compiler;

function Compiler (inputNodes, inputFile, outputFile, options = {}) {
  CachingWriter.call (this, inputNodes, {
    annotation: options.annotation,
    persistentOutput: options.persistentOutput,
    cacheInclude: options.cacheInclude,
    cacheExclude: options.cacheExclude
  });

  this.inputFile = inputFile;
  this.outputFile = outputFile;
  this.options = options;

  this.sass = require ('sass');
}

Compiler.prototype.build = function () {
  // Compute the full path of the output file and ensure the directory for
  // the output file exists.
  const dstFile = path.join (this.outputPath, this.outputFile);
  ensureDirSync (path.dirname (dstFile));

  const file = path.join (this.inputPaths[0], this.inputFile);
  //console.log (`rendering ${file}`);

  const sassOptions = {
    file,
    includePaths: this.options.includePaths,

    imagePath: this.options.imagePath,
    outputStyle: this.options.outputStyle,
    precision: this.options.precision,
    sourceComments: this.options.sourceComments,
  };

  const result = this.sass.renderSync (sassOptions);

  if (file.includes ('mdc-data-table')) {
    console.error (dstFile);
    console.error (`buffer length: ${result.css.length}`);
  }

  writeFileSync (dstFile, result.css);
};

module.exports = Compiler;
