import MdcButtonBase from "../-private/-mdc-button-base";
import { service } from '@ember/service';

export default class MdcButtonLinkTo extends MdcButtonBase {
  @service
  mdcUrl;

  get href () {
    return this.mdcUrl.fromComponent (this);
  }
}
