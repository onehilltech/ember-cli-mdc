import Component from 'ember-cli-mdc-base/component';

export default class MdcIcon extends Component {
  get iconClass () {
    return this.args.iconClass || 'material-icons';
  }

  get type () {
    return this.args.type || 'i';
  }
}
