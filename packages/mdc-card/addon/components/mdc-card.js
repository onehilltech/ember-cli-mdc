import Component from 'ember-cli-mdc-base/component';

export default class MdcCardComponent extends Component {
  get outlined () {
    return this.args.outlined || false;
  }
}
