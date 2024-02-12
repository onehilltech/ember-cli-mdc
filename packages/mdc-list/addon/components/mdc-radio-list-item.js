import ListItemComponent from '@ember/component';
import { tracked } from "@glimmer/tracking";

export default class MdcRadioListItemComponent extends ListItemComponent {
  @tracked
  role = 'radio';

  @tracked
  checked = false;

  doPrepareElement (element) {
    super.doPrepareElement (...arguments)

    element.setAttribute ('aria-checked', this.checked);
  }
};
