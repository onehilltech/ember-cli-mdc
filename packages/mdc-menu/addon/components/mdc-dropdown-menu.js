import Component from '@glimmer/component';
import { tracked } from "@glimmer/tracking";
import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';

export default class MdcDropdownMenuComponent extends Component {
  @tracked
  open;

  @action
  openMenu () {
    this.open = true;
  }

  get menuId () {
    return guidFor (this);
  }

  get anchorElement () {
    return `#${this.args.anchorElement || this.menuId}`;
  }

  get icon () {
    return this.args.icon || 'more_vert';
  }
}
