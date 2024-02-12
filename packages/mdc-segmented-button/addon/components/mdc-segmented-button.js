import { Component } from 'ember-cli-mdc-base';
import { MDCSegmentedButton } from '@material/segmented-button';

import {MDCRadio} from "@material/radio";
export default class MdcSegmentedButtonComponent extends Component {
  get singleSelect () {
    const { singleSelect = false } = this.args;
    return singleSelect;
  }

  doPrepareElement (element) {
    if (this.singleSelect) {
      // Make sure the role attribute is set on each segment for single select.
      const segments = element.querySelectorAll ('.mdc-segmented-button__segment');
      segments.forEach (segment => segment.setAttribute ('role', 'radio'));

      const selected = element.querySelectorAll ('.mdc-segmented-button__segment.mdc-segmented-button__segment--selected');

      if (selected.length === 0 && segments.length > 0) {
        segments[0].classList.add ('mdc-segmented-button__segment--selected');
      }
    }
  }

  doCreateComponent (element) {
    return new MDCSegmentedButton (element);
  }

}
