import Component from '@ember/component';
import layout from '../templates/components/mdc-switch-with-label';

export default Component.extend({
  layout,

  classNames: ['mdc-switch-with-label'],

  label: null,

  didInsertElement () {
    this._super (...arguments);

    const input = this.element.querySelector ('.mdc-switch__native-control');
    this.set ('switchId', input.getAttribute ('id'));
  }
});
