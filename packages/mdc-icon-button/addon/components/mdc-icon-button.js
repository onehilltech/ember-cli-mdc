import Component from 'ember-cli-mdc-base/component';

export default class MdcIconButton extends Component {
  get iconClass () {
    return this.args.iconClass || 'material-icons';
  }
};
