import Component from '@ember/component';
import layout from '../templates/components/mdc-snackbar-label';

export default Component.extend({
  layout,

  classNames: ['mdc-snackbar__label'],

  attributeBindings: ['role', 'aria-live'],

  role: 'status',

  'aria-live': 'polite'
});
