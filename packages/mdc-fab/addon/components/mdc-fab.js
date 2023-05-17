import Component from '@glimmer/component';
import { dasherize } from '@ember/string';

export default class MdcFabComponent extends Component {
  get position () {
    return this.args.position || 'bottomRight';
  }

  get positionClassName () {
    return `mdc-fab--${dasherize (this.position)}`;
  }
}
