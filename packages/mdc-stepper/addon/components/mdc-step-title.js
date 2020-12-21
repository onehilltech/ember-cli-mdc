import Component from '@ember/component';
import layout from '../templates/components/mdc-step-title';

import { computed } from '@ember/object';

export default Component.extend({
  layout,

  tagName: 'span',

  classNames: ['mdc-step__title'],

  text: computed ('params.[]', function () {
    return this.params[0];
  })
}).reopenClass ({
  positionalParams: 'params'
});
