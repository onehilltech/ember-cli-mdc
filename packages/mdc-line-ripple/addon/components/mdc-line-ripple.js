/* globals mdc */

import Component from '@ember/component';
import layout from '../templates/components/mdc-line-ripple';

import { computed } from '@ember/object';
import { isPresent } from '@ember/utils';

export default Component.extend({
  layout,

  classNames: ['mdc-line-ripple'],

  /// Activate the line ripple.
  activate: false,

  _lineRipple: null,

  didInsertElement () {
    this._super (...arguments);

    this._lineRipple =  new mdc.lineRipple.MDCLineRipple (this.element);
    this._doActivate ();
  },

  didUpdateAttr () {
    this._super (...arguments);

    this._doActivate ();
  },

  willDestroyElement () {
    this._super (...arguments);

    this._lineRipple.destroy ();
  },

  _doActivate () {
    const activate = this.get ('activate');

    if (activate) {
      this._lineRipple.activate ();
    }
    else {
      this._lineRipple.deactivate ();
    }
  }
});
