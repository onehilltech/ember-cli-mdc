import Component from '@ember/component';
import layout from '../templates/components/mdc-content';

import FixedAdjust from '../mixins/fixed-adjust';
import Theme from 'ember-cli-mdc-theme/mixins/theme';

export default Component.extend (Theme, FixedAdjust, {
  layout,

  classNames: ['mdc-content']
});
