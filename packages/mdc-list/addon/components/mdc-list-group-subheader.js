import Component from '@ember/component';
import layout from '../templates/components/mdc-list-group-subheader';

export default Component.extend({
  layout,

  tagName: 'h3',

  classNames: ['mdc-list-group__subheader']
});
