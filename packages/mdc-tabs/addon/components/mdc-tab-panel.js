import Component from '@ember/component';
import layout from '../templates/components/mdc-tab-panel';

export default Component.extend({
  layout,

  classNames: ['mdc-tab-panel'],

  classNameBindings: ['active:mdc-tab-panel--active'],

  active: false
});
