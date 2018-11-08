import Component from '@ember/component';
import layout from '../templates/components/mdc-textfield-with-helper-text';

import HelperTextSupport from '../mixins/helper-text-support';

import { alias, equal, not, and, oneWay } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default Component.extend (HelperTextSupport, {
  layout,

  classNames: ['mdc-text-field-with-helper-text'],

  // {{mdc-textfield}}
  // Set the style for the text field. The default style comes from the configurator.
  // To change the style, just set this value when adding the component to handlebars.
  style: oneWay ('_defaultConfig.style'),

  // Set the text field as dense. The default dense value comes from the configurator.
  // To change the style, just set this value when adding the component to handlebars.
  dense: oneWay ('_defaultConfig.dense'),

  label: null,
  disabled: false,

  icon: null,
  iconPosition: null,
  iconClickable: false,
  iconClick: null,

  _defaultConfig: service ('mdc-textfield-configurator')
});
