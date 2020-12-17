import Component from '@ember/component';

import HelperTextSupport from '../mixins/helper-text-support';

import { oneWay } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default Component.extend (HelperTextSupport, {
  classNames: ['mdc-text-field-with-helper-text'],

  // {{mdc-textfield}}
  // Set the style for the text field. The default style comes from the configurator.
  // To change the style, just set this value when adding the component to handlebars.
  style: oneWay ('_defaultConfig.style'),

  label: null,
  disabled: false,

  icon: null,
  iconPosition: null,
  iconClickable: false,
  iconClick: null,

  _defaultConfig: service ('mdc-textfield-configurator')
});
