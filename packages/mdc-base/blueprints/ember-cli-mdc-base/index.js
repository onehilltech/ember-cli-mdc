/* eslint-env node */
module.exports = {
  description: '',

  afterInstall () {
    return this.addPackagesToProject ([
      {name: '@material/base'},
    ]);
  }
};
