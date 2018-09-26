import Component from '@ember/component';
import ChipMixin from '../mixins/chip';

import layout from '../templates/components/mdc-chip';

import { equal, and } from '@ember/object/computed';


export default Component.extend (ChipMixin, {
  layout
});
