import LinkComponent from '@ember/routing/link-component';

export default LinkComponent.extend ({
  init () {
    this._super (...arguments);

    // This component should never have a block. We can just add the
    // back arrow as the first parameter.
    this.get ('params').unshift ('arrow_back');
  },

  classNames: ['mdc-top-app-bar__navigation-icon', 'material-icons'],

  /// By default, we replace the history.
  replace: true
});
