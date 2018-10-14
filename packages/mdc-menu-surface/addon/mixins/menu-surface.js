import Mixin from '@ember/object/mixin';

import { equal } from '@ember/object/computed';

const MENU_SURFACE_ANCHOR_CLASS = 'mdc-menu-surface--anchor';

export default Mixin.create ({
  classNames: ['mdc-menu-surface'],
  classNameBindings: ['isFixed:mdc-menu-surface--fixed'],

  /// The anchor location for the menu. Must be "parent" or "body".
  anchor: 'parent',
  anchorToParent: equal ('anchor', 'parent'),
  anchorToBody: equal ('anchor', 'body'),

  /// Position of the menu surface. This should either be fixed or
  /// absolute.
  position: null,

  /// Set the position left of the menu when position is absolute.
  positionLeft: 0,

  /// Set the position top of the menu when position is absolute.
  positionTop: 0,

  /// The menu has fixed positioning.
  isFixed: equal ('position', 'fixed'),

  /// The menu has absolute positioning.
  isAbsolute: equal ('position', 'absolute'),

  positionLeft_: null,
  positionTop_: null,

  quickOpen: false,
  open: false,

  didInsertElement () {
    this._super (...arguments);

    let anchorToParent = this.get ('anchorToParent');

    if (anchorToParent) {
      this.element.parentElement.classList.add (MENU_SURFACE_ANCHOR_CLASS);
    }
  },

  didUpdateAttrs () {
    this._super (...arguments);

    let anchorToParent = this.get ('anchorToParent');

    if (anchorToParent) {
      this.element.parentElement.classList.add (MENU_SURFACE_ANCHOR_CLASS);
    }
    else {
      this.element.parentElement.classList.remove (MENU_SURFACE_ANCHOR_CLASS);
    }
  },

  didRender () {
    this._super (...arguments);

    let {
      anchorToBody,
      isAbsolute,
      open,
      quickOpen
    } = this.getProperties (['anchorToBody', 'isAbsolute', 'open', 'quickOpen']);

    if (anchorToBody) {
      this.hoistMenuToBody ();
    }

    if (isAbsolute) {
      this._doAbsolutePosition ();
    }

    this.doQuickOpen (quickOpen);
    this.doOpen (open);
  },

  /**
   * Set the absolute position for the menu.
   *
   * This method must be overloaded by the component.
   */
  setAbsolutePosition (/*x, y*/) {

  },

  /**
   * Hoist the menu to the body.
   *
   * This method must be overloaded by the component.
   */
  hoistMenuToBody () {

  },

  doOpen (/*open*/) {

  },

  doQuickOpen () {

  },

  /**
   * Set the menu surface to absolute positioning.
   *
   * @private
   */
  _doAbsolutePosition () {
    let { positionLeft, positionTop } = this.getProperties (['positionLeft', "positionTop"]);

    if (this.positionLeft_ !== positionLeft || this.positionTop_ !== positionTop) {
      this.setAbsolutePosition (this.positionLeft, this.positionTop);

      this.positionLeft_ = positionLeft;
      this.positionTop_ = positionTop;
    }
  }
});
