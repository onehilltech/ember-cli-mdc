import Component from '@ember/component';
import layout from '../templates/components/mdc-icon';

const Icon = Component.extend({
  layout,
  tagName: 'i',
  classNames: ['material-icons']
});

Icon.reopenClass ({
  positionalParams: ['icon']
});

export default Icon;
