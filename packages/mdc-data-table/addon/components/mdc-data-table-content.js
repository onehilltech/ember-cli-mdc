import Component from '@ember/component';
import layout from '../templates/components/mdc-data-table-content';

export default Component.extend({
  layout,

  tagName: 'tbody',

  classNames: ['mdc-data-table__content'],
});
