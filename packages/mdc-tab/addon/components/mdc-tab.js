import Component from 'ember-cli-mdc-base/component';
import listener from 'ember-cli-mdc-base/listener';

import { action } from '@ember/object';
const { MDCTab } = mdc.tab;

function noOp () {}

export default class MdcTabComponent extends Component {
  @action
  didInsert (element) {
    let tab = new MDCTab (element);
    this._mdcComponentCreated (tab);
  }

  @listener ('MDCTab:interacted')
  didInteract (ev) {
    const { detail } = ev;

    this.interacted (detail);
  }

  get interacted () {
    return this.args.interacted || noOp;
  }
}
