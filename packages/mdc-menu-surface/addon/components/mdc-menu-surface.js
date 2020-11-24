/* global mdc */

import Component from 'ember-cli-mdc-base/component';
import listener  from 'ember-cli-mdc-base/listener';
import { action } from '@ember/object';
import { isString } from 'lodash-es';

const { MDCMenuSurface } = mdc.menuSurface;

function noOp () { }

export default class MdcMenuSurfaceComponent extends Component {
  _menuSurface = null;

  @action
  didInsert (element) {
    this._menuSurface = new MDCMenuSurface (element);
    this._mdcComponentCreated (this._menuSurface);

    this._menuSurface.quickOpen = this.args.quickOpen;

    let { position, left, top, anchorCorner, anchorMargin, anchorElement, open, quickOpen, hoisted } = this.args;

    // Configure the menu surface.
    if (position === 'fixed') {
      this._menuSurface.setFixedPosition (true);
    }
    else {
      this._menuSurface.setFixedPosition (false);
      this._menuSurface.setAbsolutePosition (left, top);
    }

    this._menuSurface.quickOpen = quickOpen;
    this._menuSurface.anchorElement = this._lookupElement (anchorElement);

    this._menuSurface.setAnchorCorner (anchorCorner);
    this._menuSurface.setAnchorMargin (anchorMargin);

    if (hoisted) {
      this._menuSurface.setIsHoisted ()
    }

    // Now that it has been configure, let's see if we should open it.
    if (open) {
      this._menuSurface.open ();
    }
  }

  @action
  toggleOpen (element, [open]) {
    if (open) {
      // They are toggle the menu surface open state. This is because we cannot modify
      // the 'open' argument internally. We therefore have to assume in update to the
      // argument that bears the value `true` means toggle the menu surface.

      if (this._menuSurface.isOpen ()) {
        this._menuSurface.close (true);
      }
      else {
        this._menuSurface.open ();
      }
    }
    else if (this._menuSurface.isOpen) {
      // The open argument was changed to false. This means some external behavior changed
      // the argument to false, meaning the really want to close the menu surface.
      this._menuSurface.close (true);
    }
  }

  @action
  quickOpen (element, [quickOpen]) {
    this._menuSurface.quickOpen = quickOpen;
  }

  @action
  setPosition (element, [position, left, top]) {
    if (position === 'fixed') {
      this._menuSurface.setFixedPosition (true);
    }
    else {
      this._menuSurface.setFixedPosition (false);
      this._menuSurface.setAbsolutePosition (left, top);
    }
  }

  @action
  anchorCorner (element, [anchorCorner]) {
    this._menuSurface.setAnchorCorner (anchorCorner);
  }

  @action
  anchorMargin (element, [anchorMargin]) {
    this._menuSurface.setAnchorMargin (anchorMargin);
  }

  @action
  anchorElement (element, [anchorElement]) {
    this._menuSurface.anchorElement = this._lookupElement (anchorElement);
  }

  @listener('MDCMenuSurface:opened')
  didOpen () {
    this.opened ();
  }

  @listener('MDCMenuSurface:closed')
  didClose () {
    this.closed ();
  }

  get opened () {
    return this.args.opened || noOp;
  }

  get closed () {
    return this.args.closed || noOp;
  }

  _lookupElement (element) {
    return isString (element) ? window.document.querySelector (element) : element;
  }
}
