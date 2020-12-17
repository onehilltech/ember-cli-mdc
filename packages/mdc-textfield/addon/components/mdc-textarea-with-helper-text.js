import Component from '@ember/component';
import { inject as service } from '@ember/service';

import HelperTextSupport from '../mixins/helper-text-support';

export default Component.extend (HelperTextSupport, {
  classNames: ['mdc-text-area-with-helper-text'],

  _defaultConfig: service ('mdc-textarea-configurator'),
});
