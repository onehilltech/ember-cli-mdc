import Mixin from '@ember/object/mixin';
import ListItem from 'ember-cli-mdc-list/mixins/list-item';

export default Mixin.create (ListItem, {
  classNames: ['mdc-menu-item'],
  classNameBindings: ['selected:mdc-menu-item--selected'],

  selected: false,

  role: 'menuitem'
});
