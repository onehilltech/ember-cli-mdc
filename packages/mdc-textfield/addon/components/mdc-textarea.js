import Component from '@ember/component';
import layout from '../templates/components/mdc-textarea';

import { computed } from '@ember/object';
import { not } from '@ember/object/computed';

import TextSupport from '../mixins/text-support';

export default Component.extend (TextSupport, {
  layout,

  classNames: ['mdc-text-field--textarea'],
  classNameBindings: ['fullWidth:mdc-text-field--fullwidth'],

  fullWidth: false,
  notFullWidth: not ('fullWidth'),

  textAreaId: computed (function () {
    return `${this.elementId}-textarea`;
  })
});
