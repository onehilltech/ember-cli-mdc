'use strict';

module.exports = {
  name: 'ember-cli-mdc-typography',

  contentFor (type, config) {
    this._super (...arguments);

    if (type === 'head-footer') {
      if (!process.env.CORBER)
        return '<link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" rel="stylesheet" />';
    }
  }
};
