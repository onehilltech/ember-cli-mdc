import Component from 'ember-cli-mdc-base/component';

export default class MdcIcon extends Component {
  get type () {
    return this.args.type || 'i';
  }
}
