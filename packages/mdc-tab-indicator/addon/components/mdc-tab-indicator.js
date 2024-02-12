import Component from 'ember-cli-mdc-base/component';
import { MDCTabIndicator } from '@material/tab-indicator';

export default class MdcTabIndicatorComponent extends Component {
  doCreateComponent (element) {
    return new MDCTabIndicator (element);
  }
}
