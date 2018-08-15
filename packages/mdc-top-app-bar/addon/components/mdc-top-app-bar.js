/* global mdc */

import Component from '@ember/component';
import layout from '../templates/components/mdc-top-app-bar';

import { computed } from '@ember/object';
import { isEmpty, isPresent } from '@ember/utils';

import { assert } from '@ember/debug';

const MDCTopAppBar = mdc.topAppBar.MDCTopAppBar;
const STYLES = ['fixed','dense','prominent','short'];

function noOp () {

}

export default Component.extend({
  layout,

  tagName: 'header',

  classNames: 'mdc-top-app-bar',
  classNameBindings: ['styleClassName', 'fixedAdjustClassName', 'alwaysClosedClassName:mdc-top-app-bar--short-collapsed'],

  /// Notification for navigation button clicked.
  navigation: null,

  alwaysClosed: false,

  _topAppBar: null,

  style: null,
  styleClassName: computed ('style', function () {
    const style = this.get ('style');

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

  willDestroyElement () {
    this._super (...arguments);
    this._destroyComponent ();
  },

  doNavigation () {
    this.getWithDefault ('navigation', noOp) ();
  },

  didRender () {
    this._super (...arguments);

    if (isPresent (this._topAppBar)) {
      this._destroyComponent ();
    }

    this._topAppBar = new MDCTopAppBar (this.element);
    this._topAppBar.listen ('MDCTopAppBar:nav', this.doNavigation.bind (this));
  },

  _destroyComponent () {
    this._topAppBar.unlisten ('MDCTopAppBar:nav', this.doNavigation.bind (this));
    this._topAppBar.destroy ();
  }
});
