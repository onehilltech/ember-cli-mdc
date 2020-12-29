import LinkComponent from '@ember/routing/link-component';

export default class MdcTopAppBarNavigateUpToComponent extends LinkComponent {
  /// By default, we replace the history.
  replace = true;

  get icon () {
    return this.args.icon || 'arrow_back';
  }

  get label () {
    return this.args.label || 'Back';
  }
}
