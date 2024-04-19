import MdcTab from './mdc-tab';
import { service } from '@ember/service';

export default class MdcTabLinkTo extends MdcTab {
  @service
  mdcUrl;

  get href () {
    return this.mdcUrl.fromComponent (this);
  }

  get active () {
    return this.mdcUrl.isActive (this);
  }
}
