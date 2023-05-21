import Component from 'ember-cli-mdc-base/component';
import { isPresent } from '@ember/utils';

export default class MdcButtonBase extends Component {
  doPrepareElement (element) {
    const svgElements = element.querySelectorAll ('svg');

    for (let i = 0; i < svgElements.length; ++ i) {
      svgElements[i].classList.add ('mdc-button__icon')
    }
  }

  get style () {
    const { style } = this.args;
    return isPresent (style) ? `mdc-button--${style}` : null;
  }

  get kind () {
    return this.args.kind;
  }

  get hasLeadingIcon () {
    return !!this.args.leadingIcon || !!this.args.leadingImage;
  }

  get hasTrailingIcon () {
    return !!this.args.trailingIcon || !!this.args.trailingImage;
  }
}