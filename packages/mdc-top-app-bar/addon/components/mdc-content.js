import Component from '@ember/component';
import layout from '../templates/components/mdc-content';

import Theme from 'ember-cli-mdc-theme/mixins/theme';

import { computed } from '@ember/object';
import { isEmpty, isPresent } from '@ember/utils';
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

  _topAppBarChangeListener: null,

  init () {
    this._super (...arguments);

    this._topAppBarChangeListener = this.didTopAppBarChange.bind (this);
  },

  didInsertElement () {
    this._super (...arguments);

    // Locate the top app bar component, and listen for changes.
    const topAppBar = document.querySelector ('.mdc-top-app-bar');

    if (isPresent (topAppBar)) {
      let style = this._getFixedStyleFromTopAppBar ();
      this.set ('_topAppBarStyle', style);
    }

    // Listen for changes to the top app bar from the body. The change event should
    // bubble to the body element. We listen from the body and not the top app bar
    // because Ember allows user to render templates into named outlets. There is a
    // good chance the top app bar name not exist at the time this component is render.
    // We want to make sure we observe the changes.

    document.body.addEventListener ('MDCTopAppBar:change', this._topAppBarChangeListener);
  },

  willDestroyElement () {
    this._super (...arguments);

    document.body.removeEventListener ('MDCTopAppBar:change', this._topAppBarChangeListener);
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
