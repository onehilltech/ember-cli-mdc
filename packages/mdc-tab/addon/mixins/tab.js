/* global mdc */

import Mixin from '@ember/object/mixin';

function noOp () {}

export default Mixin.create ({
  tagName: 'button',

  classNames: ['mdc-tab'],

  attributeBindings: ['active:aria-selected'],

  contentOnlyIndicator: false,

  _tab: null,

});
