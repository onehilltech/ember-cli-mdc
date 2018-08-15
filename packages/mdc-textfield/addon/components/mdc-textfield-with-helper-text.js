import Component from '@ember/component';
import layout from '../templates/components/mdc-textfield-with-helper-text';

import HelperTextSupport from '../mixins/helper-text-support';

export default Component.extend (HelperTextSupport, {
  layout,

  classNames: ['mdc-text-field-with-helper-text'],

  // {{mdc-textfield}}
  label: null,
  style: null,
  disabled: false,
  dense: false,

  icon: null,
  iconPosition: null,
  iconClickable: false,
  iconClick: null
});
