import Component from 'ember-cli-mdc-base/component';
import { action } from '@ember/object';

function noOp () {}

export default class MdcChipComponent extends Component {
  _chipElement;

  doPrepareElement (element) {
    this._chipElement = element;
  }

  doInitComponent (component) {
    component.shouldRemoveOnTrailingIconClick = this.removeOnTrailingIconClick;
  }

  get permanent () {
    const { permanent = false } = this.args;
    return permanent;
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
