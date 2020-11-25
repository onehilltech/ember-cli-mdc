/* globals mdc */

import Component from 'ember-cli-mdc-base/component';
import { isPresent } from '@ember/utils';
import { action } from '@ember/object';

const { MDCRadio } = mdc.radio;

export default class MdcRadioComponent extends Component {

  @action
  didInsert (element) {
    this._radio = new MDCRadio (element);
    this._radioElement = element;

    this._mdcComponentCreated (this._radio);
  }

  get for () {
    return isPresent (this._radioElement) ? this._radioElement.querySelector ('.mdc-radio__native-control').id : undefined;
  }
}
