/* globals mdc */

import Component from 'ember-cli-mdc-base/component';
import { isPresent } from '@ember/utils';
import { action } from '@ember/object';

const { MDCRadio } = mdc.radio;

export default class MdcRadioComponent extends Component {
  _radioElement;

  doPrepareElement (element) {
    this._radioElement = element;
  }

  doCreateComponent (element) {
    return new MDCRadio (element);
  }

  get for () {
    return isPresent (this._radioElement) ? this._radioElement.querySelector ('.mdc-radio__native-control').id : undefined;
  }
}
