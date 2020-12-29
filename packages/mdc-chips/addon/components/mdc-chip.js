import Component from 'ember-cli-mdc-base/component';
import { action } from '@ember/object';

function noOp () {}

export default class MdcChipComponent extends Component {
  _chipElement;

  doPrepareElement (element) {
    this._chipElement = element;
  }

  get element () {
    return this._chipElement;
  }

  get tabindex () {
    return this.args.tabindex || 0;
  }

  @action
  remove () {
    (this.args.remove || noOp)(this);
  }
}
