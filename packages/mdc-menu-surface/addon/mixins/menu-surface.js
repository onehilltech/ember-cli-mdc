/* globals mdc */

import Mixin from '@ember/object/mixin';
import { equal } from '@ember/object/computed';
import { isPresent, isNone } from '@ember/utils';
import { assert } from '@ember/debug';

const MENU_SURFACE_ANCHOR_CLASS = 'mdc-menu-surface--anchor';
const { Corner } = mdc.menuSurface;

const ANCHOR_CORNERS = Object.freeze ({
  topLeft: Corner.TOP_LEFT,
  topRight: Corner.TOP_RIGHT,
  bottomLeft: Corner.BOTTOM_LEFT,
  bottomRight: Corner.BOTTOM_RIGHT,
  topStart: Corner.TOP_START,
  topEnd: Corner.TOP_END,
  bottomStart: Corner.BOTTOM_START,
  bottomEnd: Corner.BOTTOM_END
});

const ANCHOR_CORNER_ENUMS = Object.freeze (Object.keys (ANCHOR_CORNERS));

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
  left: 0,

  /// Set the position top of the menu when position is absolute.
  top: 0,

  /// The menu has fixed positioning.
  isFixed: equal ('position', 'fixed'),

  /// The menu has absolute positioning.
  isAbsolute: equal ('position', 'absolute'),

  /// The anchor corner for the menu surface.
  anchorCorner: null,

  /// The margin between the anchor and the menu surface.
  anchorMargin: null,

  _currLeft: null,
  _currTop: null,
  _currAnchorCorner: null,
  _currAnchorMargin: null,

  quickOpen: false,
  open: false,

  didInsertElement () {
    this._super (...arguments);

    let anchorToParent = this.anchorToParent;

    if (anchorToParent) {
      this.element.parentElement.classList.add (MENU_SURFACE_ANCHOR_CLASS);
    }
  },

  didUpdateAttrs () {
    this._super (...arguments);

    let anchorToParent = this.anchorToParent;

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
      quickOpen,
      anchorCorner,
      _currAnchorCorner: currAnchorCorner,
      anchorMargin,
      _currAnchorMargin: currAnchorMargin
    } = this;

    if (anchorToBody) {
      this.hoistMenuToBody ();
    }

    if (isAbsolute) {
      this._doAbsolutePosition ();
    }

    if (currAnchorCorner !== anchorCorner) {
      let anchor = null;

      if (isPresent (anchorCorner)) {
        assert (`The anchorCorner must be one of the following values: ${ANCHOR_CORNER_ENUMS}`, ANCHOR_CORNER_ENUMS.includes (anchorCorner));
        anchor = ANCHOR_CORNERS[anchorCorner];
      }

      this.setAnchorCorner (anchor);
      this._currAnchorCorner = anchorCorner;
    }

    if (anchorMargin !== currAnchorMargin) {
      // Set the anchor margins only if the margins have changed since the last time
      // we rendered the menu surface.
      if ((isNone (anchorMargin) && isPresent (currAnchorMargin)) ||
          (isPresent (anchorMargin) && isNone (currAnchorMargin)) ||
          (anchorMargin.top !== currAnchorMargin.top ||
            anchorMargin.left !== currAnchorMargin.left ||
            anchorMargin.right !== currAnchorMargin.right ||
            anchorMargin.bottom !== currAnchorMargin.bottom))
      {
        this.setAnchorMargin (anchorMargin);
        this._currAnchorMargin = anchorMargin;
      }
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
   * Set the anchor corner for the menu surface.
   *
   * @param corner
   */
  setAnchorCorner (/*corner*/) {

  },

  /**
   * Set the anchor margin.
   *
   * @param margin
   */
  setAnchorMargin (/*margin*/) {

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
    let { left, top } = this;

    if (this._currLeft !== left || this._currTop !== top) {
      this.setAbsolutePosition (this.left, this.top);

      this._currLeft = left;
      this._currTop = top;
    }
  }
});
