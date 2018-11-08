import Component from '@ember/component';
import layout from '../templates/components/mdc-textarea-with-helper-text';

import { oneWay } from '@ember/object/computed';
import { inject as service } from '@ember/service';

import HelperTextSupport from '../mixins/helper-text-support';

export default Component.extend (HelperTextSupport, {
  layout,

  classNames: ['mdc-text-area-with-helper-text'],

  dense: oneWay ('_defaultConfig.dense'),

  _defaultConfig: service ('mdc-textarea-configurator'),
});
