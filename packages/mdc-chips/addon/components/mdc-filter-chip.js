import MdcChipComponent from './mdc-chip';
import { action } from '@ember/object';

export default class MdcFilterChipComponent extends MdcChipComponent {
  doPrepareElement (element) {
    super.doPrepareElement (element);

    const { checked = false } = this.args;

    if (checked) {
      element.classList.add ('mdc-chip--selected');
    }
  }

  @action
  hideLeadingIcon (element) {
    const { checked = false } = this.args;

    if (checked) {
      element.classList.add ('mdc-chip__icon--leading-hidden');
    }
  }
}
