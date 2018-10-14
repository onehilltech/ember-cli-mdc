/* global mdc */

import Component from '@ember/component';
import layout from '../templates/components/mdc-menu';
import MenuSurface from 'ember-cli-mdc-menu-surface/mixins/menu-surface';

const { MDCMenu } = mdc.menu;

function noOp () { }

export default Component.extend (MenuSurface, {
  classNames: ['mdc-menu'],

  attributeBindings: ['tabindex'],

  layout,

  menu_: null,

  tabindex: -1,

  selectedEventListener_: null,
  openedEventListener_: null,
  closedEventListener_: null,

  init () {
    this._super (...arguments);

    this.selectedEventListener_ = this.didSelect.bind (this);
    this.openedEventListener_ = this.didOpen.bind (this);
    this.closedEventListener_ = this.didClose.bind (this);
  },

  didInsertElement () {
    this._super (...arguments);

    this.menu_ = new MDCMenu (this.element);

    this.menu_.listen ('MDCMenuSurface:opened', this.openedEventListener_);
    this.menu_.listen ('MDCMenuSurface:closed', this.closedEventListener_);
    this.menu_.listen ('MDCMenu:selected', this.selectedEventListener_);
  },

  willDestroyElement () {
    this._super (...arguments);

    this.menu_.unlisten ('MDCMenuSurface:opened', this.openedEventListener_);
    this.menu_.unlisten ('MDCMenuSurface:closed', this.closedEventListener_);
    this.menu_.unlisten ('MDCMenu:selected', this.selectedEventListener_);
    this.menu_.destroy ();
  },

  /**
   * Set the absolute position for the menu.
   *
   * This method must be overloaded by the component.
   */
  setAbsolutePosition (x, y) {
    this.menu_.setAbsolutePosition (x, y);
  },

  /**
   * Hoist the menu to the body.
   *
   * This method must be overloaded by the component.
   */
  hoistMenuToBody () {
    this.menu_.hoistMenuToBody ();
  },

  doOpen (open) {
    this.menu_.open = open;
  },

  doQuickOpen (quickOpen) {
    this.menu_.quickOpen = quickOpen;
  },

  didSelect ({ detail: { item, index }}) {
    this.getWithDefault ('selected', noOp) (item.id, index);
  },

  didOpen () {
    this.getWithDefault ('opened', noOp) ();
  },

  didClose () {
    this.set ('open', false);
    this.getWithDefault ('closed', noOp) ();
  }
});
