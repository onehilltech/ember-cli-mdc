/* global mdc */

import Component from '@ember/component';
import layout from '../templates/components/mdc-floating-label';

const { MDCFloatingLabel } = mdc.floatingLabel;
import { isPresent } from '@ember/utils';

export default Component.extend({
  layout,

  tagName: 'label',

  classNames: ['mdc-floating-label'],

  classNameBindings: ['floatAbove:mdc-floating-label--float-above', 'shake:mdc-floating-label--shake'],

  attributeBindings: ['for'],

  for: null,

  /// The floating label is embedded in a component that already creates a floating label.
  embedded: false,

  _floatingLabel: null,

  didInsertElement () {
    this._super (...arguments);

    let embedded = this.embedded;

    if (!embedded) {
      this._floatingLabel = new MDCFloatingLabel (this.element);
    }
  },

  willDestroyElement () {
    this._super (...arguments);

    if (isPresent (this._floatingLabel)) {
      this._floatingLabel.destroy ();
    }
  }
});
