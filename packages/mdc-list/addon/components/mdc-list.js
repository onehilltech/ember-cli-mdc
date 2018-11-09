/* global mdc */

import Component from '@ember/component';
import layout from '../templates/components/mdc-list';

export default Component.extend({
  layout,

  tagName: 'ul',

  classNames: ['mdc-list'],

  classNameBindings: [
    'dense:mdc-list--dense',
    'interactive::mdc-list--non-interactive',
    'twoLine:mdc-list--two-line',
    'avatarList:mdc-list--avatar-list'
  ],

  singleSelection: false,
  interactive: true,
  twoLine: false,
  avatarList: false,

  wrapFocus: false,

  attributeBindings: ['role', 'orientation:aria-orientation'],

  orientation: 'vertical',

  _list: null,

  didInsertElement () {
    this._super (...arguments);

    this._list = new mdc.list.MDCList (this.element);

    const { wrapFocus, singleSelection } = this.getProperties (['wrapFocus', 'singleSelection']);
    this._list.singleSelection = singleSelection;
    this._list.wrapFocus = wrapFocus;
  },

  didUpdateAttrs () {
    this._super (...arguments);

    const { wrapFocus, singleSelection } = this.getProperties (['wrapFocus', 'singleSelection']);
    this._list.singleSelection = singleSelection;
    this._list.wrapFocus = wrapFocus;
  }
});
