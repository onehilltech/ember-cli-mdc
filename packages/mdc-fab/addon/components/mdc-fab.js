import Component from '@ember/component';
import layout from '../templates/components/mdc-fab';

import FabMixin from '../mixins/fab';

import { computed } from '@ember/object';
import { isPresent } from '@ember/utils';

export default Component.extend (FabMixin, {
  layout,

  tagName: 'button'
});