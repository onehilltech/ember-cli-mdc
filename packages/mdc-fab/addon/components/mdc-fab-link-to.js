import LinkComponent from '@ember/routing/link-component';
import layout from '../templates/components/mdc-fab';

import FabMixin from '../mixins/fab';

export default LinkComponent.extend (FabMixin, {
  layout
});