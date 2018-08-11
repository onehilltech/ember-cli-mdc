import Component from '@ember/component';
import layout from '../templates/components/mdc-icon-button';
import { computed } from '@ember/object';

import { Ripple } from 'ember-cli-mdc-ripple';

export default Component.extend (Ripple, {
  layout,

  tagName: 'button',

  classNames: ['mdc-icon-button', 'material-icons'],

  attributeBindings: ['disabled'],

  disabled: false,

  icon: computed ('params.[]', function () {
    return this.get ('params')[0];
  }),

  didInsertElement () {
    this._super (...arguments);

    this._ripple.unbounded = true;
  }
}).reopenClass ({
  positionalParams: 'params'
});
