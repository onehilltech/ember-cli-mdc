import LinkComponent from '@ember/routing/link-component';
import layout from '../templates/components/mdc-list-item-linkto';

export default LinkComponent.extend({
  layout,

  classNames: ['mdc-list-item'],

  activeClass: 'mdc-list-item--selected'
});
