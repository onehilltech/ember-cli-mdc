import Component from '@ember/component';
import layout from '../templates/components/mdc-dialog-body';

export default Component.extend({
  layout,

  tagName: 'section',

  classNames: ['mdc-dialog__body'],

  classNameBindings: ['scrollable:mdc-dialog__body--scrollable'],

  scrollable: false
});
