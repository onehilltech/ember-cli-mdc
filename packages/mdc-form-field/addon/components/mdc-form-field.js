import Component from 'ember-cli-mdc-base/component';
import { MDCFormField } from '@material/form-field';

export default class MdcFormFieldComponent extends Component {
  doCreateComponent (element) {
    return new MDCFormField (element);
  }
}
