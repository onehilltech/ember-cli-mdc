import Component from '@glimmer/component';
import { service } from '@ember/service';

export default class MdcListItemLinkTo extends Component {
  get tabindex () {
    return this.args.tabindex || 0;
  }

  @service
  mdcUrl;

  get href () {
    return this.mdcUrl.fromComponent (this);
  }

  get activated () {
    return this.mdcUrl.isActive (this);
  }
}
