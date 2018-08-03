import Component from '@ember/component';
import { Theme } from 'ember-cli-mdc-theme';

import layout from '../templates/components/foo-button';

export default Component.extend (Theme, {
  classNameBindings: ['testing'],

  layout,

  tagName: 'button',

  init () {
    this._super (...arguments);
  }
});
