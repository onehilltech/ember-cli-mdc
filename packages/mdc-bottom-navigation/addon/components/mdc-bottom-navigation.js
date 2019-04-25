import Component from '@ember/component';
import layout from '../templates/components/mdc-bottom-navigation';

export default Component.extend({
  layout,

  classNames: ['mdc-bottom-navigation'],

  classNameBindings: ['spaceEvenly:mdc-bottom-navigation--space-evenly'],

  spaceEvenly: false,
});
