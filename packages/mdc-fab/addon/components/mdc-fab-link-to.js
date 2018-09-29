import LinkComponent from '@ember/routing/link-component';
import layout from '../templates/components/mdc-fab';

import FabMixin from '../mixins/fab';

import { computed } from '@ember/object';
import { isPresent } from '@ember/utils';

export default LinkComponent.extend (FabMixin, {
  layout
});