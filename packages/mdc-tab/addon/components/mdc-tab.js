import Component from 'ember-cli-mdc-base/component';
import listener from 'ember-cli-mdc-base/listener';

const { MDCTab } = mdc.tab;

function noOp () {}

export default class MdcTabComponent extends Component {
  doCreateComponent (element) {
    return new MDCTab (element);
  }

  @listener ('MDCTab:interacted')
  interacted (ev) {
    this.didInteract (ev);

    const { detail: { tabId } } = ev;
    (this.args.interacted || noOp) (tabId);
  }

  didInteract (ev) {

  }
}
