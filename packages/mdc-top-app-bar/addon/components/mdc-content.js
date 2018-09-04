import Component from '@ember/component';
import layout from '../templates/components/mdc-content';

import FixedAdjust from '../mixins/fixed-adjust';

export default Component.extend (FixedAdjust, {
  layout,

  classNames: ['mdc-content']
});
