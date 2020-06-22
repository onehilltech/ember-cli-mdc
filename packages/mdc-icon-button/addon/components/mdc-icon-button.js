import Component from 'ember-cli-mdc-base/component';
import { action } from '@ember/object';

export default class MdcIconButton extends Component {
  @action
  didClick () {
    this.onClick (...arguments);
  }

  get onClick () { return this.args.onClick || function () { return true }; }
};
