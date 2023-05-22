import Component from 'ember-cli-mdc-base/component';
import { guidFor } from '@ember/object/internals';

import { MDCFormField } from '@material/form-field';
import { assert } from '@ember/debug';

export default class MdcFormFieldComponent extends Component {
  doPrepareElement (element) {
    const inputElement = element.querySelector ('input');
    assert ('The MdcFormField component must wrap an input element.', !!inputElement);

    inputElement.id = this.id;
  }

  doCreateComponent (element) {
    return new MDCFormField (element);
  }

  get id () {
    return guidFor (this);
  }
}
