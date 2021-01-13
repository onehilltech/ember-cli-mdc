/* global mdc */

import Component from 'ember-cli-mdc-base/component';
import { MDCFloatingLabel } from '@material/floating-label';

export default class MDCFloatingLabelComponent extends Component {
  doCreateComponent (element) {
    return new MDCFloatingLabel (element);
  }
}
