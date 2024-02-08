import Component from 'ember-cli-mdc-base/component';

import { tracked } from '@glimmer/tracking';
import { isPresent } from '@ember/utils';
import { guidFor } from '@ember/object/internals';
import { equal } from '@ember/object/computed';
import { assert } from '@ember/debug';

import { MDCTextField } from '@material/textfield';

const STYLES = ['filled', 'outlined'];

export default class MdcTextareaComponent extends Component {
  @tracked
  labelId;

  @tracked
  helperId;

  get style () {
    return this.args.style || this.configurator.style || 'filled';
  }

  get styleClassName () {
    const style = this.style;

    assert (`The textarea component supports the following styles: ${STYLES}`, STYLES.includes (style));

    return `mdc-text-field--${style}`;
  }

  @equal ('style', 'filled')
  filled;

  @equal ('style', 'outlined')
  outlined;

  get resizable () {
    const { resizable = true } = this.args;
    return resizable;
  }

  doPrepareElement (element) {
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
