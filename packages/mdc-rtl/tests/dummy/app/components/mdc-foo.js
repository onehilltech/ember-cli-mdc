import Component from '@ember/component';
import layout from '../templates/components/mdc-foo';

import { Rtl } from 'ember-cli-mdc-rtl';

export default Component.extend (Rtl, {
  layout,

  classNames: ['mdc-foo']
});
