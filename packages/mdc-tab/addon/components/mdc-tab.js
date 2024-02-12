import Component from 'ember-cli-mdc-base/component';
import listener from 'ember-cli-mdc-base/listener';
import { MDCTab } from '@material/tab';

function noOp () {}

export default class MdcTabComponent extends Component {
  doCreateComponent (element) {
    return new MDCTab (element);
  }

  @listener ('MDCTab:interacted')
  interacted (ev) {
    const { detail: { tabId } } = ev;
    this.notifyInteracted (tabId);
  }

  didInteract (tabId) {

  }

  notifyInteracted (tabId) {
    this.didInteract (tabId);
    this.dispatchEvent ('MdcTab:interacted', { tabId });
  }
}
