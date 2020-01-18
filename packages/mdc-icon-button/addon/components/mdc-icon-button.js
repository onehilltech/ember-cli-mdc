import Component from '@ember/component';
import IconButtonMixin from '../mixins/icon-button';

import layout from '../templates/components/mdc-icon-button';

import { computed } from '@ember/object';

export default Component.extend (IconButtonMixin, {
  layout,

  tagName: 'button',

  icon: computed ('params.[]', function () {
    return this.get ('params')[0];
  })
}).reopenClass ({
  positionalParams: 'params'
});
