import Component from 'ember-cli-mdc-base/component';
import { service } from '@ember/service';

export default class MdcBottomNavigationLinkComponent extends Component {
  @service
  mdcUrl;

  get href () {
    return this.mdcUrl.fromComponent (this);
  }

  get isActive () {
    return this.mdcUrl.isActive (this);
  }
}
