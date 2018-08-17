import Component from '@ember/component';
import layout from '../templates/components/mdc-form-field';

import FormFieldMixin from '../mixins/form-field';

export default Component.extend (FormFieldMixin, {
  layout
});
