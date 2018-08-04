import Component from '@ember/component';
import layout from '../templates/components/mdc-icon';

export default Component.extend({
  layout,
  tagName: 'i',
  classNames: ['material-icons']
}).reopenClass ({
  positionalParams: ['icon']
});
