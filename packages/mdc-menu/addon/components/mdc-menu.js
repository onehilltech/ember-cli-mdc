/* global mdc */

import MdcMenuSurfaceComponent from 'ember-cli-mdc-menu-surface/components/mdc-menu-surface';
import listener from 'ember-cli-mdc-base/listener';

import { MDCMenu } from '@material/menu';

function noOp () { }

export default class MdcMenuComponent extends MdcMenuSurfaceComponent {
  doCreateComponent (element) {
    return new MDCMenu (element);
  }

  @listener ('MDCMenu:selected')
  selected (ev) {
    const { detail: { item, index }} = ev;

    (this.args.selected || noOp)(item, index);
  }

  isOpen (component) {
    return component.open;
  }

  doOpen (component) {
    component.open = true;
  }

  doClose (component) {
    component.open = false;
  }

  set anchorElement (element) {
    this.component.setAnchorElement (element);
  }
}
