import Component from '@ember/component';
import layout from '../templates/components/mdc-dialog-surface';

import { computed } from '@ember/object';

export default Component.extend({
  layout,

  classNames: ['mdc-dialog__surface'],

  didInsertElement () {
    this._super (...arguments);

    this.element.setAttribute ('role', 'alertdialog');
    this.element.setAttribute ('aria-modal', true);
  },

  titleId: computed (function () {
    return `${this.elementId}-title`;
  }).readOnly (),

  contentId: computed (function () {
    return `${this.elementId}-content`;
  })
});
