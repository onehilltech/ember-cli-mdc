import LinkComponent from '@ember/routing/link-component';
import ButtonMixin from '../mixins/button';

import layout from '../templates/components/mdc-button';
import { alias } from '@ember/object/computed';

export default LinkComponent.extend (ButtonMixin, {
  layout,

  createRippleComponent: true,

  label: alias ('params.0')
});
