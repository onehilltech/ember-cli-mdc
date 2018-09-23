import Component from '@ember/component';
import layout from '../templates/components/mdc-fab';

import FabMixin from '../mixins/fab';

export default Component.extend (FabMixin, {
  layout,

  tagName: 'button',
});
