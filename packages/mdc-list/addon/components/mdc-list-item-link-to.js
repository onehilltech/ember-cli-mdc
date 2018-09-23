import LinkComponent from '@ember/routing/link-component';
import ListItemMixin from '../mixins/list-item';

export default LinkComponent.extend (ListItemMixin, {
  activeClass: 'mdc-list-item--activated'
});
