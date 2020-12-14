/* global mdc */

import Component from 'ember-cli-mdc-base/component';
import listener  from 'ember-cli-mdc-base/listener';
import { action } from '@ember/object';
import { isString } from 'lodash-es';

const { MDCMenuSurface } = mdc.menuSurface;

function noOp () { }

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

    component.setAnchorCorner (anchorCorner);
    component.setAnchorMargin (anchorMargin);

    if (hoisted) {
      component.setIsHoisted ()
    }

    // Now that it has been configure, let's see if we should open it.
    if (open) {
      component.open ();
    }
  }

  @action
  toggleOpen (element, [open]) {
    if (open) {
      // They are toggle the menu surface open state. This is because we cannot modify
      // the 'open' argument internally. We therefore have to assume in update to the
      // argument that bears the value `true` means toggle the menu surface.

      if (this.component.isOpen ()) {
        this.component.close (true);
      }
      else {
        this.component.open ();
      }
    }
    else if (this.component.isOpen) {
      // The open argument was changed to false. This means some external behavior changed
      // the argument to false, meaning the really want to close the menu surface.
      this.component.close (true);
    }
  }

  @action
  quickOpen (element, [quickOpen]) {
    this.component.quickOpen = quickOpen;
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
    this.component.setAnchorCorner (anchorCorner);
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
