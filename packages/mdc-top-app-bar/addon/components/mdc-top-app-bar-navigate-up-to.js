import LinkComponent from '@ember/routing/link-component';

export default class MdcTopAppBarNavigateUpToComponent extends LinkComponent {
  /// By default, we replace the history.
  replace = true;

  icon = 'arrow_back';

  label = 'Back';
}
