import Component from '@ember/component';
import layout from '../templates/components/mdc-dialog-surface';

import { computed } from '@ember/object';

export default Component.extend({
  layout,

  classNames: ['mdc-dialog__surface'],

  didInsertElement () {
    this._super (...arguments);

    const { titleId, contentId } = this.getProperties (['titleId', 'contentId']);

    this.element.setAttribute ('role', 'alertdialog');
    this.element.setAttribute ('aria-modal', true);
    this.element.setAttribute ('aria-labelledby', titleId);
    this.element.setAttribute ('aria-describedby', contentId);
  },

  titleId: computed (function () {
    return `${this.elementId}-title`;
  }).readOnly (),

  contentId: computed (function () {
    return `${this.elementId}-content`;
  })
});
