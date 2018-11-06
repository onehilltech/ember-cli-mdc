/* global mdc */

import Component from '@ember/component';
import Theme from 'ember-cli-mdc-theme/mixins/theme';

import layout from '../templates/components/mdc-top-app-bar';

import { computed } from '@ember/object';
import { isEmpty, isPresent } from '@ember/utils';

import { assert } from '@ember/debug';

const MDCTopAppBar = mdc.topAppBar.MDCTopAppBar;
const STYLES = ['fixed','dense','prominent','short'];

function noOp () { }

export default Component.extend (Theme, {
  layout,

  tagName: 'header',

  classNames: 'mdc-top-app-bar',
  classNameBindings: ['styleClassName', 'fixedAdjustClassName', 'alwaysClosedClassName:mdc-top-app-bar--short-collapsed'],

  /// Notification for navigation button clicked.
  navigation: undefined,

  alwaysClosed: false,

  _topAppBar: undefined,
  _navEventListener: undefined,

  style: null,
  styleClassName: computed ('style', function () {
    const style = this.get ('style');

    // Notify the listeners that our style has changed.
    const event = new CustomEvent ('MDCTopAppBar:change', { detail: { style } });
    this.element.dispatchEvent (event);

    if (isEmpty (style)) {
      return null;
    }

    assert (`The style attribute must be one of the following values: ${STYLES}`, STYLES.includes (style));
    return `mdc-top-app-bar--${style}`;
  }),

  alwaysClosedClassName: computed ('{alwaysClosed,style}', function () {
    const {alwaysClosed,style} = this.getProperties (['style','alwaysClosed']);
    return alwaysClosed && style === 'short' ? 'mdc-top-app-bar--short-collapsed' : null;
  }),

  init () {
    this._super (...arguments);

    this._navEventListener = this.doNavigation.bind (this);
  },

  didInsertElement () {
    this._super (...arguments);
    this._createComponent ();
  },

  didUpdate () {
    this._super (...arguments);

    this._destroyComponent ();
    this._createComponent ();
  },


  willDestroyElement () {
    this._super (...arguments);
    this._destroyComponent ();
  },

  doNavigation () {
    this.getWithDefault ('navigation', noOp) ();
  },

  _createComponent () {
    this._topAppBar = new MDCTopAppBar (this.element);

    this._topAppBar.listen ('MDCTopAppBar:nav', this._navEventListener);
  },

  _destroyComponent () {
    this._topAppBar.unlisten ('MDCTopAppBar:nav', this._navEventListener);
    this._topAppBar.destroy ();
  }
});
