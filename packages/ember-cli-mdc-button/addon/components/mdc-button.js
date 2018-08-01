import Component from '@ember/component';
import layout from '../templates/components/mdc-button';

import { MDCRipple } from '@material/ripple';

export default Component.extend({
  layout,

  tagName: 'button',

  classNames: ['mdc-button'],

  didInsertElement () {
    this._super (...arguments);

    this.mdcComponent = new MDCRipple (this.element);
  }
});
