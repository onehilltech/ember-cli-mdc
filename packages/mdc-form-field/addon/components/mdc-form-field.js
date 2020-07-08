import Component from '@glimmer/component';

export default class MdcFormFieldComponent extends Component {
  get alignEnd () {
    return this.args.alignEnd || false;
  }

  get noWrap () {
    return this.args.noWrap || false;
  }
}
