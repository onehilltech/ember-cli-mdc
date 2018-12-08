import LinkComponent from '@ember/routing/link-component';

export default LinkComponent.extend ({
  init () {
    this._super (...arguments);

    // This component should never have a block. We can just add the navigation
    // icon as the first parameter.
    this.get ('params').unshift (this.get ('icon'));
  },

  classNames: ['mdc-top-app-bar__navigation-icon', 'material-icons'],

  /// By default, we replace the history.
  replace: true,

  /// The default navigation icon.
  icon: 'arrow_back'
});
