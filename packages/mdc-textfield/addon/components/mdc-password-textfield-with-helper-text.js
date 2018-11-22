import Component from '@ember/component';
import layout from '../templates/components/mdc-password-textfield-with-helper-text';

import HelperTextSupport from '../mixins/helper-text-support';

export default Component.extend (HelperTextSupport, {
  layout,

  classNames: ['mdc-text-field--password'],

  showPassword: false,

  iconOn: 'visibility',

  iconOff: 'visibility_off',

  actions: {
    toggle () {
      this.toggleProperty ('showPassword');
    }
  }
});
