/* globals mdc */

import Component from '@ember/component';
import layout from '../templates/components/mdc-line-ripple';

import { computed } from '@ember/object';
import { isPresent } from '@ember/utils';

export default Component.extend({
  layout,

  classNames: ['mdc-line-ripple'],

  classNameBindings: ['styleClassName'],

  styleClassName: computed ('style', function () {
    const style = this.get ('style');
    return isPresent (style) ? `mdc-line-ripple--${style}` : null;
  }),

  style: null,

  _lineRipple: null,

  didInsertElement () {
    this._super (...arguments);

    this._lineRipple =  new mdc.lineRipple.MDCLineRipple (this.element);
  },

  willDestroyElement () {
    this._super (...arguments);

    this._lineRipple.destroy ();
  }
});
