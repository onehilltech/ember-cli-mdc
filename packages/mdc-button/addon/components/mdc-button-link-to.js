import MdcButtonComponent from './mdc-button';
import { service } from '@ember/service';

export default class MdcButtonLinkTo extends MdcButtonComponent {
  @service
  mdcUrl;

  get href () {
    return this.mdcUrl.fromComponent (this);
  }
}
