/* global mdc */

import Component from '@ember/component';
import layout from '../templates/components/mdc-drawer';

import { computed } from '@ember/object';
import { assert } from '@ember/debug';
import { isEmpty, isNone } from '@ember/utils';
import { equal } from '@ember/object/computed';

const STYLES = [
  'dismissible',
  'modal'
];

export default Component.extend ({
  layout,

  tagName: 'aside',

  classNames: ['mdc-drawer', 'mdc-typography'],

  classNameBindings: ['styleClassName'],

  styleClassName: computed ('style', function () {
    const style = this.get ('style');

    if (isEmpty (style)) {
      return null;
    }

    assert (`The style must be one of the following: ${STYLES}`, STYLES.includes (style));

    return `mdc-drawer--${style}`;
  }),

  _openEventListener: null,

  _closeEventListener: null,

  _currentStyle: null,

  _clickEventListener: null,

  isModal: equal ('style', 'modal'),
  isDismissible: equal ('style', 'dismissible'),

  _drawerContent: null,

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
    this._drawer.open = open;

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
      this.set ('_currentStyle', this.get ('style'));
    }

    this._drawer.open = this.get ('open');
  },

  willDestroyElement () {
    this._super (...arguments);
    this._destroyComponent ();

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
    if (this._drawer) {
      this._destroyComponent ();
    }

    this._drawer = new mdc.drawer.MDCDrawer (this.element);
    this._drawer.listen ('MDCDrawer:opened', this._openEventListener);
    this._drawer.listen ('MDCDrawer:closed', this._closeEventListener);
  },

  _destroyComponent () {
    this._drawer.unlisten ('MDCDrawer:opened', this._openEventListener);
    this._drawer.unlisten ('MDCDrawer:closed', this._closeEventListener);

    this._drawer.destroy ();
    this._drawer = null;
  }
});
