import Component from '@ember/component';
import RippleMixin from 'ember-cli-mdc-ripple/mixins/ripple';

import layout from '../templates/components/mdc-icon-button';

import { computed } from '@ember/object';

export default Component.extend (RippleMixin, {
  layout,

  tagName: 'button',

  classNames: ['mdc-icon-button', 'material-icons'],
  attributeBindings: ['disabled', 'value', 'type', 'form'],

  createRippleComponent: true,

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
