import LinkComponent from '@ember/routing/link-component';
import BottomNavigationButtonMixin from '../mixins/bottom-navigation-button';

import layout from '../templates/components/mdc-bottom-navigation-link-to';

export default LinkComponent.extend (BottomNavigationButtonMixin, {
  layout,

  classNames: ['mdc-bottom-navigation__link'],

  activeClass: 'mdc-bottom-navigation--active'
});
