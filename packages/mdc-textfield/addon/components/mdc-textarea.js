import Component from 'ember-cli-mdc-base/component';

import { tracked } from '@glimmer/tracking';
import { isPresent } from '@ember/utils';
import { guidFor } from '@ember/object/internals';

import { MDCTextField } from '@material/textfield';

export default class MdcTextareaComponent extends Component {
  @tracked
  labelId;

  @tracked
  helperId;

  doPrepareElement (element) {
    let { value } = this.args;

    if (isPresent (value)) {
      element.classList.add ('mdc-text-field--label-floating');
    }

    this.labelId = guidFor (this);
    this.helperId = `${guidFor (this)}__helper-text`;
  }

  doCreateComponent (element) {
    return new MDCTextField (element);
  }

  get helperLine () {
    let { characterCount = false } = this.args;
    return isPresent (this.helperText) || characterCount;
  }

  get helperText () {
    let { errorMessage, helperText } = this.args;
    return errorMessage || helperText;
  }

  get persistentHelperText () {
    let { persistentHelperText, errorMessage } = this.args;
    return isPresent (errorMessage) || persistentHelperText;
  }
}
