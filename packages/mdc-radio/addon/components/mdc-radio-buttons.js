import Component from '@ember/component';
import layout from '../templates/components/mdc-radio-buttons';

export default Component.extend({
  layout,

  classNames: 'mdc-radio-buttons',

  actions: {
    change ({target}) {
      this.set ('value', target.value);
    }
  }
});
