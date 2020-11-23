import LinkComponent from '@ember/routing/link-component';
import { isPresent } from '@ember/utils';
import { HAS_BLOCK } from '@glimmer/component';

export default class MdcFabLinkComponent extends LinkComponent {
  classNames = ['mdc-fab'];
  classNameBindings = ['extended:mdc-fab--extended', 'exited:mdc-fab--exited', 'mini:mdc-fab--mini'];

  get extended () {
    return isPresent (this.label) || this.hasBlock;
  }
}