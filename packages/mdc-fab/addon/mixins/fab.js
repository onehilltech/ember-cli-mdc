import Mixin from '@ember/object/mixin';

import Ripple from 'ember-cli-mdc-ripple/mixins/ripple';
import Themed from 'ember-cli-mdc-theme/mixins/theme';

export default Mixin.create (Ripple, Themed, {
  classNames: ['mdc-fab'],

  classNameBindings: ['mini:mdc-fab--mini', 'exited:mdc-fab--exited'],

  attributeBindings: ['label:aria-label', 'type'],

  /// Optional label for the component
  label: null,

  didRender () {
    this._super (...arguments);

    // Check if the component has a label element. If the component does have
    // a label element, then we can mark this fab as extended.
    const $labels = this.$ ('.mdc-fab__label');
    this.$ ().toggleClass ('mdc-fab--extended', $labels.length === 1);
  }
});
