import Component from '@glimmer/component';

export default class MdcTopAppBarNavigateUpToComponent extends Component {
  get icon () {
    return this.args.icon || 'arrow_back';
  }

  get label () {
    return this.args.label || 'Back';
  }
}
