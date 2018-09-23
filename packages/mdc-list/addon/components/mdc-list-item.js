import Component from '@ember/component';
import ListItemMixin from '../mixins/list-item';
import layout from '../templates/components/mdc-list-item';

export default Component.extend (ListItemMixin, {
  layout,

  tagName: 'li'
});
