/* global mdc */

import Component from '@ember/component';
import layout from '../templates/components/mdc-drawer';

import { computed } from '@ember/object';
import { assert } from '@ember/debug';
import { isEmpty, isNone, isPresent } from '@ember/utils';
import { equal } from '@ember/object/computed';

const STYLES = [
  'dismissible',
  'modal',
  'permanent'
];

export default Component.extend ({
  layout,

  tagName: 'aside',

  classNames: ['mdc-drawer', 'mdc-typography'],

  classNameBindings: ['styleClassName'],

  _openEventListener: null,

  _closeEventListener: null,

  _currentStyle: null,

  _clickEventListener: null,

  isModal: equal ('style', 'modal'),
  isDismissible: equal ('style', 'dismissible'),
  isPermanent: equal('style', 'permanent'),

  // The material component.
  _drawer: null,

  // The content of the drawer.
  _drawerContent: null,

  // The scrim element automatically added after model drawer.
  _drawerScrim: null,

  styleClassName: computed ('style', function () {
    const style = this.get ('style');

    // Notify the listeners that our style has changed.
    if (isEmpty (style)) {
      return null;
    }

    assert (`The style must be one of the following: ${STYLES}`, STYLES.includes (style));

    return `mdc-drawer--${style}`;
  }),

  init () {
    this._super (...arguments);

    this._openEventListener = this.didOpen.bind (this);
    this._closeEventListener = this.didClose.bind (this);
    this._clickEventListener = this.didClick.bind (this);
  },

  didInsertElement () {
    this._super (...arguments);

    this._createComponent ();

    // Set the open state for the component.
    const { style, open } = this.getProperties (['style', 'open']);

    if (isPresent (this._drawer)) {
      this._drawer.open = open;
    }

    this._drawerContent = this.element.querySelector ('.mdc-drawer__content');
    this._drawerContent.addEventListener ('click', this._clickEventListener);

    // Save the style just in case it changes.
    this.set ('_currentStyle', style);
  },

  didUpdateAttrs () {
    this._super (...arguments);

    // If the style has changed, then we need to delete the original component
    // before the class for the new style is added to the html. Otherwise, we
    // we will have a hard time destroying the old component.

    const { style, _currentStyle:currentStyle } = this.getProperties (['style', '_currentStyle']);

    if (style !== currentStyle) {
      this._destroyComponent ();
    }
  },

  didUpdate () {
    this._super (...arguments);

    if (isNone (this._drawer)) {
      this._createComponent ();
      let style = this.get ('style');

      // Cache the current style, and send notification the style has changed.
      this.set ('_currentStyle', style);

      if (isPresent (this._drawer)) {
        this._drawer.emit ('MDCDrawer:change', { style });
      }
    }

    if (isPresent (this._drawer)) {
      this._drawer.open = this.get ('open');
    }
  },

  willDestroyElement () {
    this._super (...arguments);

    // Destroy the component.
    this._destroyComponent ();

    // Make sure the drawer scrim has been removed.
    this._removeDrawerScrim ();

    // Stop listening to events from the drawer content.
    this._drawerContent.removeEventListener ('click', this._clickEventListener);
  },

  didClick (ev) {
    if (!this.get ('isModal')) {
      return;
    }

    if (ev.target.classList.contains ('mdc-list-item')) {
      this.set ('open', false);
    }
  },

  didOpen () {
    this.set ('open', true);
  },

  didClose () {
    this.set ('open', false);
  },
  
  _createComponent () {
    if (isPresent (this._drawer)) {
      this._destroyComponent ();
    }

    // We need to create the scrim (in case of a modal dialog) before we create
    // the component. This is because the MDC will search for the drawer scrim
    // during its creation process.

    if (this.get ('isModal')) {
      this._insertDrawerScrim ();
    }
    else {
      this._removeDrawerScrim ();
    }

    if (!this.get ('isPermanent')) {
      // We instantiate a drawer component for modal and dismissible.
      this._drawer = new mdc.drawer.MDCDrawer (this.element);
      this._drawer.listen ('MDCDrawer:opened', this._openEventListener);
      this._drawer.listen ('MDCDrawer:closed', this._closeEventListener);
    }
  },

  _destroyComponent () {
    if (isPresent (this._drawer)) {
      this._drawer.unlisten ('MDCDrawer:opened', this._openEventListener);
      this._drawer.unlisten ('MDCDrawer:closed', this._closeEventListener);

      this._drawer.destroy ();
      this._drawer = null;
    }
  },

  /**
   * Insert the drawer scrim into the tree.
   *
   * @private
   */
  _insertDrawerScrim () {
    if (isPresent (this._drawerScrim)) {
      return;
    }

    this._drawerScrim = document.createElement ('div');
    this._drawerScrim.classList.add ('mdc-drawer-scrim');

    // The scrim must be inserted directly after the drawer (i.e., this element).
    let parent = this.element.parentElement;
    parent.insertBefore (this._drawerScrim, this.element.nextSibling);
  },

  /**
   * Remove the drawer scrim from the tree.
   *
   * @private
   */
  _removeDrawerScrim () {
    if (isPresent (this._drawerScrim)) {
      this._drawerScrim.remove ();
      this._drawerScrim = null;
    }
  }
});
