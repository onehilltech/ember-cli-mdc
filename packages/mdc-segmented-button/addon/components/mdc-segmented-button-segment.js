import Component from '@glimmer/component';

export default class MdcSegmentedButtonSegmentComponent extends Component {
  get iconClassName () {
    return this.args.iconClassName || 'material-icons';
  }
}
