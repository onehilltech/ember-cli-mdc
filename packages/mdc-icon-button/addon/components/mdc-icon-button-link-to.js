import MdcIconButtonComponent from './mdc-icon-button';
import { service } from '@ember/service';

export default class MdcIconButtonLinkTo extends MdcIconButtonComponent {
  @service
  mdcUrl;

  get href () {
    return this.mdcUrl.fromComponent (this);
  }
}