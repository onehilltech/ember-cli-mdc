/* global mdc */

import Component from 'ember-cli-mdc-base/component';
import listener  from 'ember-cli-mdc-base/listener';

import { action } from '@ember/object';
import { isPresent } from '@ember/utils';
import { assert } from '@ember/debug';

import { isString } from 'lodash-es';

const { MDCMenuSurface, Corner } = mdc.menuSurface;

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
    const { position, left, top, anchorCorner, anchorMargin, anchorElement, open, quickOpen, hoisted } = this.args;

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
    component.anchorElement = this._lookupElement (anchorElement);

    if (isPresent (anchorCorner)) {
      this.setAnchorCorner (anchorCorner);
    }

    if (isPresent (anchorMargin)) {
      component.setAnchorMargin (anchorMargin);
    }

    if (hoisted) {
      component.setIsHoisted ()
    }

    // Now that it has been configure, let's see if we should open it.
    if (open) {
      this.doOpen (component);
    }
  }

  doOpen (component) {
    component.open ();
  }

  doClose (component) {
    component.close (true);
  }

  setAnchorCorner (anchorCorner) {
    let value;

    if (isPresent (anchorCorner)) {
      assert (`The anchor corner must be one of the following values: ${ANCHOR_CORNER_KEYS}`, ANCHOR_CORNER_KEYS.includes (anchorCorner));
      value = ANCHOR_CORNERS[anchorCorner];
    }

    this.component.setAnchorCorner (value);
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
        this.doOpen (component);
      }
    }
    else if (this.isOpen (component)) {
      // The open argument was changed to false. This means some external behavior changed
      // the argument to false, meaning the really want to close the menu surface.
      this.doClose (component);
    }
  }

  @action
  quickOpen (element, [quickOpen]) {
    this.component.quickOpen = quickOpen;
  }

  isOpen (component) {
    return component.isOpen ();
  }

  @action
  setPosition (element, [position, left, top]) {
    if (position === 'fixed') {
      this.component.setFixedPosition (true);
    }
    else {
      this.component.setFixedPosition (false);
      this.component.setAbsolutePosition (left, top);
    }
  }

  @action
  anchorCorner (element, [anchorCorner]) {
    this.setAnchorCorner (anchorCorner);
  }

  @action
  anchorMargin (element, [anchorMargin]) {
    this.component.setAnchorMargin (anchorMargin);
  }

  @action
  anchorElement (element, [anchorElement]) {
    this.component.anchorElement = this._lookupElement (anchorElement);
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
