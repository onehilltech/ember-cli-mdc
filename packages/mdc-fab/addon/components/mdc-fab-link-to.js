import MdcFabComponent from './mdc-fab';
import { service } from '@ember/service';

export default class MdcFabLinkToComponent extends MdcFabComponent {
  @service
  mdcUrl;

  get href () {
    return this.mdcUrl.fromComponent (this);
  }
}
