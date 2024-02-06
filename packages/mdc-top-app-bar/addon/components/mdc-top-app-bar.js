import Component from 'ember-cli-mdc-base/component';
import listener from 'ember-cli-mdc-base/listener';

import { action } from '@ember/object';
import { isPresent } from '@ember/utils';

import { MDCTopAppBar } from '@material/top-app-bar';

function noOp () { }

export default class MdcTopAppBarComponent extends Component {
  _topAppBar = null;

  @action
  doCreateComponent (element) {
    return new MDCTopAppBar (element);
  }

  doInitComponent () {
    let { scrollTarget } = this.args;

    if (isPresent (scrollTarget)) {
      this.setScrollTarget (scrollTarget);
    }
  }

  @action
  reinitialize (element) {
    const newTopAppBar = new MDCTopAppBar (element);
    this.replaceComponent (newTopAppBar);
  }

  @listener ('MDCTopAppBar:nav')
  navigation () {
    this.doNavigate ();
    (this.args.navigation || noOp)();
  }

  doNavigate () {

  }

  changeScrollTarget (element, [scrollTarget]) {
    this.setScrollTarget (scrollTarget);
  }

  setScrollTarget (scrollTarget) {
    let element = document.querySelector (scrollTarget);

    if (isPresent (element)) {
      this.component.setScrollTarget (element);
    }
  }
}
