/* global mdc */

import Mixin from '@ember/object/mixin';

function noOp () {}

export default Mixin.create ({
  tagName: 'button',

  classNames: ['mdc-tab'],

  attributeBindings: ['active:aria-selected'],

  contentOnlyIndicator: false,

  _tab: null,

  didInsertElement () {
    this._super (...arguments);

    this.element.setAttribute ('role', 'tab');
    this.element.setAttribute ('tabindex', -1);

    this._tab = new mdc.tab.MDCTab (this.element);
    this._tab.listen ('MDCTab:interacted', this.didInteract.bind (this));
  },

  willDestroyElement () {
    this._super (...arguments);

    this._tab.unlisten ('MDCTab:interacted', this.didInteract.bind (this));
    this._tab.destroy ();
  },

  didInteract () {
    this.getWithDefault ('interacted', noOp) ();
  }
});
