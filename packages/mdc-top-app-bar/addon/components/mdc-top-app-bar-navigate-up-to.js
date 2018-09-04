import LinkComponent from '@ember/routing/link-component';
import layout from '../templates/components/mdc-top-app-bar-navigate-up-to';

export default LinkComponent.extend ({
  layout,

  classNames: ['mdc-top-app-bar__navigation-icon', 'material-icons'],
});
