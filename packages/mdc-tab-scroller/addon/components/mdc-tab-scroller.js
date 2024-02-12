import Component from 'ember-cli-mdc-base/component';
import { assert } from '@ember/debug';
import { isEmpty } from '@ember/utils';
import { MDCTabScroller } from '@material/tab-scroller';

const ALIGN_VALUES = [
  'start',
  'center',
  'end'
];


export default class MdcTabScrollerComponent extends Component {
  doCreateComponent (element) {
    return new MDCTabScroller (element);
  }

  get align () {
    const { align } = this.args;

    if (isEmpty (align)) {
      return;
    }

    assert (`The align attribute must be one of the following values: ${ALIGN_VALUES}`, ALIGN_VALUES.includes (align));

    return `mdc-tab-scroller--align-${align}`;
  }
}
