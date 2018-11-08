/* global mdc */

import Component from '@ember/component';
import MenuSurface from '../mixins/menu-surface';

import layout from '../templates/components/mdc-menu-surface';

const { MDCMenuSurface } = mdc.menuSurface;

function noOp () {

}

export default Component.extend (MenuSurface, {
  layout,

  menuSurface_: null,

  openedEventListener_: null,
  closedEventListener_: null,

  init () {
    this._super (...arguments);

    this.openedEventListener_ = this.didOpen.bind (this);
    this.closedEventListener_ = this.didClose.bind (this);
  },

  didInsertElement () {
    this._super (...arguments);

    this.menuSurface_ = new MDCMenuSurface (this.element);

    this.menuSurface_.listen ('MDCMenuSurface:opened', this.openedEventListener_);
    this.menuSurface_.listen ('MDCMenuSurface:closed', this.closedEventListener_);
  },

  willDestroyElement () {
    this._super (...arguments);

    this.menuSurface_.unlisten ('MDCMenuSurface:opened', this.openedEventListener_);
    this.menuSurface_.unlisten ('MDCMenuSurface:closed', this.closedEventListener_);
    this.menuSurface_.destroy ();
  },

  doOpen (open) {
    this.menuSurface_.open = open;
  },

  doQuickOpen (quickOpen) {
    this.menuSurface_.quickOpen = quickOpen;
  },

  didOpen () {
    this.getWithDefault ('opened', noOp) ();
  },

  didClose () {
    this.set ('open', false);
    this.getWithDefault ('closed', noOp) ();
  },

  setAbsolutePosition (x, y) {
    this.menuSurface_.setAbsolutePosition (x, y);
  },

  setAnchorCorner (corner) {
    this.menuSurface_.setAnchorCorner (corner);
  },

  setAnchorMargin (margin) {
    this.menuSurface_.setAnchorMargin (margin);
  },

  /**
   * Hoist the menu to the body.
   *
   * This method must be overloaded by the component.
   */
  hoistMenuToBody () {
    this.menuSurface_.hoistMenuToBody ();
  },
});
