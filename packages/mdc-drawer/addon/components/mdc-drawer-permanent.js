import Component from '@ember/component';
import layout from '../templates/components/mdc-drawer-permanent';

import DrawerMixin from '../mixins/drawer';

export default Component.extend (DrawerMixin, {
  layout,

  tagName: 'nav',
  classNames: ['mdc-drawer--permanent']
});
