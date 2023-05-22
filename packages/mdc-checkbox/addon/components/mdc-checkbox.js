import Component from 'ember-cli-mdc-base/component';

import { action } from '@ember/object';
import { MDCCheckbox } from '@material/checkbox';
import { guidFor } from '@ember/object/internals';

export default class MdcCheckboxComponent extends Component {
  doPre
  doCreateComponent (element) {
    return new MDCCheckbox (element);
  }

  get nativeControlId () {
    return guidFor (this);
  }

  @action
  indeterminate (element, [indeterminate]) {
    this.component.indeterminate = indeterminate;
  }
}
