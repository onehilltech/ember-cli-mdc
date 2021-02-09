import IconButtonComponent from 'ember-cli-mdc-icon-button/components/mdc-icon-button';
import { isPresent } from '@ember/utils';
import { dasherize } from '@ember/string';

export default class MdcTopAppBarNavigationIconComponent extends IconButtonComponent {
  type = 'mdc-top-app-bar__action-item';

  get iconClass () {
    if (isPresent (this.args.iconClass)) {
      return this.args.iconClass;
    }
    else if (isPresent (this.args.style)) {
      return `material-icons-${dasherize (this.args.style)}`;
    }
    else {
      return 'material-icons';
    }
  }
}

