import RippleComponent from 'ember-cli-mdc-ripple/components/mdc-ripple';
import layout from '../templates/components/mdc-icon-button';

import ButtonMixin from 'ember-cli-mdc-button/mixins/button';

import { computed } from '@ember/object';

export default RippleComponent.extend (ButtonMixin, {
  layout,

  tagName: 'button',

  classNames: ['mdc-icon-button', 'material-icons'],

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
