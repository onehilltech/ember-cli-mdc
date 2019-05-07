import List from 'ember-cli-mdc-list/components/mdc-list';

export default List.extend({
  role: 'menu',

  attributeBindings: [
    'orientation:aria-orientation',
    'tabindex'
  ],

  orientation: 'vertical',

  tabindex: -1
});
