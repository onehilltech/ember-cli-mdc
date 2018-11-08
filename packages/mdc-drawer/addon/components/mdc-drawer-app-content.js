import Component from '@ember/component';
import layout from '../templates/components/mdc-drawer-app-content';

import { equal } from '@ember/object/computed';
import { isPresent } from '@ember/utils';

const MDC_DRAWER_STYLE_REGEXP = /mdc-drawer--(.*)/;

export default Component.extend({
  layout,

  classNameBindings: ['isDismissible:mdc-drawer-app-content'],

  _drawerStyle: null,
  
  isModal: equal ('_drawerStyle', 'modal'),
  isDismissible: equal ('_drawerStyle', 'dismissible'),
  isPermanent: equal ('_drawerStyle', 'permanent'),

  _drawer: null,
  _drawerChangeListener: null,

  init () {
    this._super (...arguments);

    this._drawerChangeListener = this.didDrawerChange.bind (this);
  },

  didInsertElement () {
    this._super (...arguments);

    // Locate the top app bar component, and listen for changes.
    this._drawer = document.querySelector ('.mdc-drawer');

    if (isPresent (this._drawer)) {
      let style = this._getDrawerStyle ();
      this.set ('_drawerStyle', style);

      this._drawer.addEventListener ('MDCDrawer:change', this._drawerChangeListener);
    }
    else {
      console.warn ('This component needs a {{mdc-drawer}} component to work.');
    }

  },

  didDrawerChange ({ detail: { style }}) {
    this.set ('_drawerStyle', style);
  },

  _getDrawerStyle () {
    for (let i = 0, len = this._drawer.classList.length; i < len; ++ i) {
      const className = this._drawer.classList.item (i);
      const matches = className.match (MDC_DRAWER_STYLE_REGEXP);

      if (matches) {
        return matches[1];
      }
    }
  }
});
