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

  _list: null,

  didInsertElement () {
    this._super (...arguments);

    this.element.setAttribute ('aria-orientation', 'vertical');
    this._list = new mdc.list.MDCList (this.element);
  },

  didRender () {
    this._super (...arguments);

    this._list.singleSelection = this.get ('singleSelection');
  }
});
