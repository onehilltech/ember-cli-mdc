/* global mdc */

import Component from '@ember/component';
import layout from '../templates/components/mdc-notched-outline';

import $ from 'jquery';

export default Component.extend({
  layout,

  classNames: ['mdc-notched-outline'],
  classNameBindings: ['notched:mdc-notched-outline--notched'],

  _notchedOutline: null,

  $notchedOutlineIdle: null,

  didInsertElement () {
    this._super (...arguments);

    this._notchedOutline = new mdc.notchedOutline.MDCNotchedOutline (this.element);

    // Let's add the idle element after this element.
    this.$notchedOutlineIdle = $('<div class="mdc-notched-outline__idle"></div>');
    this.$notchedOutlineIdle.insertAfter (this.$ ());
  },

  willDestroyElement () {
    this._super (...arguments);

    this.$notchedOutlineIdle.remove ();
    this._notchedOutline.destroy ();
  }
});
