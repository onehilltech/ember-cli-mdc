/* global mdc */

import Component from 'ember-cli-mdc-base/component';
import listener  from 'ember-cli-mdc-base/listener';

import { action } from '@ember/object';
import { isPresent } from '@ember/utils';
import { assert } from '@ember/debug';

import { isString } from 'lodash-es';

import { MDCMenuSurface, Corner } from '@material/menu-surface';

function noOp () { }

const ANCHOR_CORNERS = {
  topLeft: Corner.TOP_LEFT,
  topRight: Corner.TOP_RIGHT,
  topStart: Corner.TOP_START,
  topEnd: Corner.TOP_END,
  bottomLeft: Corner.BOTTOM_LEFT,
  bottomRight: Corner.BOTTOM_RIGHT,
  bottomStart: Corner.BOTTOM_START,
  bottomEnd: Corner.BOTTOM_END
};

const ANCHOR_CORNER_KEYS = Object.keys (ANCHOR_CORNERS);

export default class MdcMenuSurfaceComponent extends Component {
  _menuSurface = null;

  doCreateComponent (element) {
    return new MDCMenuSurface (element);
  }

  doInitComponent (component) {
    if (this.args.open) {
      this.doPrepareForOpen (component);
      this.doOpen (component);
    }
  }

  doPrepareForOpen (component) {
    const { position, left, top, anchorCorner, anchorMargin, anchorElement, quickOpen, hoisted } = this.args;

    component.quickOpen = quickOpen;

    // Configure the menu surface.
    if (position === 'fixed') {
      component.setFixedPosition (true);
    }
    else {
      component.setFixedPosition (false);
      component.setAbsolutePosition (left, top);
    }

    component.quickOpen = quickOpen;

    this.anchorElement = this._lookupElement (anchorElement);
    this.anchorCorner = anchorCorner;

    if (isPresent (anchorMargin)) {
      component.setAnchorMargin (anchorMargin);
    }

    component.setIsHoisted (hoisted);
  }

  doOpen (component) {
    component.open ();
  }

  doClose (component) {
    component.close (true);
  }

  set anchorCorner (anchorCorner) {
    if (isPresent (anchorCorner)) {
      assert (`The anchor corner must be one of the following values: ${ANCHOR_CORNER_KEYS}`, ANCHOR_CORNER_KEYS.includes (anchorCorner));
      this.component.setAnchorCorner (ANCHOR_CORNERS[anchorCorner]);
    }
    else {
      this.component.setAnchorCorner (null);
    }
  }

  set anchorElement (element) {
    this.component.setMenuSurfaceAnchorElement (element);
  }

  @action
  toggleOpen (element, [open]) {
    let component = this.component;

    if (open) {
      // They are toggle the menu surface open state. This is because we cannot modify
      // the 'open' argument internally. We therefore have to assume in update to the
      // argument that bears the value `true` means toggle the menu surface.

      if (this.isOpen (component)) {
        this.doClose (component);
      }
      else {
        this.doPrepareForOpen (component);
        this.doOpen (component);
      }
    }
    else if (this.isOpen (component)) {
      // The open argument was changed to false. This means some external behavior changed
      // the argument to false, meaning the really want to close the menu surface.
      this.doClose (component);
    }
  }

  isOpen (component) {
    return component.isOpen ();
  }

  @listener('MDCMenuSurface:opened')
  opened () {
    this.didOpen ();

    (this.args.opened || noOp)();
  }

  didOpen () {

  }

  @listener('MDCMenuSurface:closed')
  closed () {
    this.didClose ();

    (this.args.closed || noOp)();
  }

  didClose () {

  }

  _lookupElement (element) {
    return isString (element) ? window.document.querySelector (element) : element;
  }
}
