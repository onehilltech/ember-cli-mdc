/* global mdc */

import Component from 'ember-cli-mdc-base/component';
import listener from 'ember-cli-mdc-base/listener';

import { assert } from '@ember/debug';
import { isEmpty, isPresent } from '@ember/utils';
import { action } from '@ember/object';

const STYLES = [ 'dismissible', 'modal' ];

import { MDCDrawer } from '@material/drawer';
import { MDCList } from '@material/list';

function noOp () {}

class DrawerImpl {
  constructor (drawer) {
    this.drawer = drawer;
  }

  doCreateComponent (element) {

  }

  cleanup () {

  }

  didClose () {

  }
}

class PermanentDrawerImpl extends DrawerImpl {
  constructor (drawer) {
    super (drawer);
  }

  doCreateComponent (element) {
    let listElement = element.querySelector ('.mdc-list');
    assert ('A permanent drawer must have a <MdcList> component, or .mdc-list element.', isPresent (listElement));

    let list = new MDCList (listElement);
    list.wrapFocus = true;

    return list;
  }
}

class DismissibleDrawerImpl extends DrawerImpl {
  constructor (drawer) {
    super (drawer);
  }

  doCreateComponent (element) {
    return new MDCDrawer (element);
  }
}

class ModalDrawerImpl extends DrawerImpl {
  _itemClickListener;
  _listElement;

  constructor (drawer) {
    super (drawer);

    this._itemClickListener = this.itemClick.bind (this);
  }

  cleanup () {
    this._listElement.removeEventListener ('click', this._itemClickListener);
  }

  doCreateComponent (element) {
    this._listElement = element.querySelector ('.mdc-list');
    this._listElement.addEventListener ('click', this._itemClickListener);

    this.prepareFocusTrap ();

    return new MDCDrawer (element);
  }

  itemClick () {
    this.drawer.component.open = false
  }

  didClose () {
    this.prepareFocusTrap ();
  }

  prepareFocusTrap () {
    // We also need to find the link that is activated and set the tab index. Otherwise,
    // the control will will not function correctly. This means we also need to remove the
    // tab index on the other links.
    let activated = this._listElement.querySelector ('.mdc-list-item--activated');
    activated.setAttribute ('tabindex', 0);
    activated.setAttribute ('aria-current', 'page');

    let notActivated = this._listElement.querySelectorAll ('.mdc-list-item:not(.mdc-list-item--activated)');
    notActivated.forEach (el => {
      el.setAttribute ('tabindex', -1);
      el.removeAttribute ('aria-current');
    });
  }
}

export default class MdcDrawerComponent extends Component {
  _appContentElement;

  _impl;

  doCreateComponent (element) {
    const { style } = this.args;
    return this.createComponent (element, style);
  }

  @action
  recreate (element, [style]) {
    let component = this.createComponent (element, style);
    this.replaceComponent (component);
  }

  createComponent (element, style) {
    let impl = this.createComponentImpl (style);
    let component = impl.doCreateComponent (element);

    // Cleanup the current implementation, and replace it with the new one.
    if (isPresent (this._impl)) {
      this._impl.cleanup ();
    }

    this._impl = impl;

    return component;
  }

  createComponentImpl (style) {
    if (style === 'modal') {
      return new ModalDrawerImpl (this);
    }
    else if (style === 'dismissible') {
      return new DismissibleDrawerImpl (this);
    }
    else {
      return new PermanentDrawerImpl (this);
    }
  }

  doInitComponent (component) {
    const { open } = this.args;

    // Find the drawer app content. We need this so we can focus on the correct
    // element when the drawer is closed.
    this._appContentElement = document.querySelector ('.mdc-drawer-app-content');

    // Open drawer, if set.
    component.open = open;
  }

  get style () {
    return this.args.style;
  }

  get isModal () {
    return this.args.style === 'modal';
  }

  get styleClassName () {
    const { style } = this.args;

    // Notify the listeners that our style has changed.
    if (isEmpty (style)) {
      return null;
    }

    assert (`The style must be one of the following: ${STYLES}`, STYLES.includes (style));

    return `mdc-drawer--${style}`;
  }

  didClick (ev) {
    if (!this.isModal) {
      return;
    }

    if (ev.target.classList.contains ('mdc-list-item')) {
      this.set ('open', false);
    }
  }

  @action
  toggleOpen (element, [open]) {
    let component = this.component;

    if (open) {
      // They are toggle the menu surface open state. This is because we cannot modify
      // the 'open' argument internally. We therefore have to assume in update to the
      // argument that bears the value `true` means toggle the menu surface.

      component.open = !component.open;
    }
    else if (component.open) {
      // The open argument was changed to false. This means some external behavior changed
      // the argument to false, meaning the really want to close the menu surface.
      component.open = false;
    }
  }

  @listener ('MDCDrawer:opened')
  opened () {
    this.didOpen ();
    (this.args.opened || noOp)();
  }

  didOpen () {

  }

  @listener ('MDCDrawer:closed')
  closed () {
    // Focus on the first element that we find in the app content.
    if (isPresent (this._appContentElement)) {
      let element = this._appContentElement.querySelector (this.focusOnClose);

      if (isPresent (element)) {
        element.focus ();
      }
    }

    // Let the implementation know it did close.
    this._impl.didClose ();

    this.didClose ();
    (this.args.closed || noOp)();
  }

  didClose () {

  }

  get focusOnClose () {
    return this.args.focusOnClose || 'input, button, select';
  }
}
