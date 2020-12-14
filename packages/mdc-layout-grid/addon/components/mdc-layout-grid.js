import Component from '@glimmer/component';

import { isPresent } from '@ember/utils';

export default class MdcLayoutGridComponent extends Component {
  get alignment () {
    const { alignment } = this.args;
    return isPresent (alignment) ? `mdc-layout-grid--align-${alignment}` : null;
  }
}
