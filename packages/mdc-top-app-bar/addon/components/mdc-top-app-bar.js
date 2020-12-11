/* global mdc */

import Component from 'ember-cli-mdc-base/component';
import listener from 'ember-cli-mdc-base/listener';

import { action } from '@ember/object';
import { isPresent } from '@ember/utils';

const { MDCTopAppBar } = mdc.topAppBar;

function noOp () { }

export default class MdcTopAppBarComponent extends Component {
  _topAppBar = null;

  @action
  didInsert (element) {
    this._topAppBar = new MDCTopAppBar (element);
    this.setup (this._topAppBar);
  }

  @action
  reinitialize (element) {
    this._topAppBar = new MDCTopAppBar (element);
    this.setup (this._topAppBar);
  }

  setup (component) {
    this._mdcComponentCreated (component);

    let { scrollTarget } = this.args;

    if (isPresent (scrollTarget)) {
      this.setScrollTarget (scrollTarget);
    }
  }

  @listener ('MDCTopAppBar:nav')
  navigation () {
    (this.args.navigation || noOp)();
  }

  changeScrollTarget (element, [scrollTarget]) {
    this.setScrollTarget (scrollTarget);
  }

  setScrollTarget (scrollTarget) {
    let element = document.querySelector (scrollTarget);

    if (isPresent (element)) {
      this._topAppBar.setScrollTarget (element);
    }
  }
}
