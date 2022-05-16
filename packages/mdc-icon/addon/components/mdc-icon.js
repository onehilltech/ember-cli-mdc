import Component from 'ember-cli-mdc-base/component';

import { isPresent } from '@ember/utils';
import { dasherize } from '@ember/string';

export default class MdcIcon extends Component {
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
