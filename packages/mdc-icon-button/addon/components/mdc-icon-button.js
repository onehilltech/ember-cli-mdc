import Component from 'ember-cli-mdc-base/component';
import { action } from '@ember/object';

export default class MdcIconButton extends Component {
  get iconClass () {
    return this.args.iconClass || 'material-icons';
  }
};
