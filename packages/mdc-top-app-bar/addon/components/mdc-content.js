import Component from '@ember/component';
import layout from '../templates/components/mdc-content';

import Theme from 'ember-cli-mdc-theme/mixins/theme';

import { computed } from '@ember/object';
import { isEmpty } from '@ember/utils';
import { assert } from '@ember/debug';


const MDC_TOP_APP_BAR_TYPE_REGEXP = /mdc-top-app-bar--(.*)/
const STYLES = ['fixed','dense','prominent','short'];

export default Component.extend (Theme, {
  layout,

  classNames: ['mdc-content'],
  classNameBindings: ['_fixedAdjustClassName'],

  _fixedAdjustClassName: computed ('_topAppBarStyle', function () {
    const topAppBarStyle = this.get ('_topAppBarStyle');

    if (isEmpty (topAppBarStyle)) {
      return null;
    }

    assert (`The topAppBarStyle attribute must be one of the following values: ${STYLES}`, STYLES.includes (topAppBarStyle));
    return topAppBarStyle === 'fixed' ? 'mdc-top-app-bar--fixed-adjust' : `mdc-top-app-bar--${topAppBarStyle}-fixed-adjust`;
  }),

  _topAppBar: null,
  _topAppBarChangeListener: null,

  init () {
    this._super (...arguments);

    this._topAppBarChangeListener = this.didTopAppBarChange.bind (this);
  },

  didInsertElement () {
    this._super (...arguments);

    // Locate the top app bar component, and listen for changes.
    this._topAppBar = document.querySelector ('.mdc-top-app-bar');

    if (this._topAppBar) {
      let style = this._getFixedStyleFromTopAppBar ();
      this.set ('_topAppBarStyle', style);

      this._topAppBar.addEventListener ('MDCTopAppBar:change', this._topAppBarChangeListener);
    }
    else {
      console.warn ('This component needs a {{mdc-top-app-bar}} component to work.');
    }
  },

  didTopAppBarChange ( { detail: { style }}) {
    this.set ('_topAppBarStyle', style);
  },

  _getFixedStyleFromTopAppBar () {
    for (let i = 0, len = this._topAppBar.classList.length; i < len; ++ i) {
      const className = this._topAppBar.classList.item (i);
      const matches = className.match (MDC_TOP_APP_BAR_TYPE_REGEXP);

      if (matches) {
        return matches[1];
      }
    }
  }
});
