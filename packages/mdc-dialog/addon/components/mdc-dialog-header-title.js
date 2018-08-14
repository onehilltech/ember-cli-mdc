import Component from '@ember/component';
import layout from '../templates/components/mdc-dialog-header-title';

export default Component.extend({
  layout,

  tagName: 'h2',

  classNames: ['mdc-dialog__header__title']
});
