/* global mdc */

import Component from 'ember-cli-mdc-base/component';
import listener from 'ember-cli-mdc-base/listener';
import { action } from '@ember/object';

const { MDCMenu } = mdc.menu;

function noOp () { }

export default class MdcMenuComponent extends Component {
  @action
  didInsert (element) {
    this.menu_ = new MDCMenu (element);
    this._mdcComponentCreated (this.menu_);
  }

  /**
   * Set the absolute position for the menu.
   *
   * This method must be overloaded by the component.
   */
  setAbsolutePosition (x, y) {
    this.menu_.setAbsolutePosition (x, y);
  }

  setAnchorCorner (corner) {
    this.menu_.setAnchorCorner (corner);
  }

  setAnchorMargin (margin) {
    this.menu_.setAnchorMargin (margin);
  }

  /**
   * Hoist the menu to the body.
   *
   * This method must be overloaded by the component.
   */
  hoistMenuToBody () {
    this.menu_.hoistMenuToBody ();
  }

  doOpen (open) {
    this.menu_.open = open;
  }

  doQuickOpen (quickOpen) {
    this.menu_.quickOpen = quickOpen;
  }

  @listener ('MDCMenu:selected')
  selected (ev) {
    const { detail: { item, index }} = ev;

    (this.args.selected || noOp)(item, index);
  }

  @listener ('MDCMenuSurface:opened')
  opened () {
    (this.args.opened || noOp)();
  }

  @listener ('MDCMenuSurface:closed')
  closed () {
    (this.args.closed || noOp)();
  }
}
