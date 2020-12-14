import ListItemLinkTo from 'ember-cli-mdc-list/components/mdc-list-item-link-to';

export default ListItemLinkTo.extend ({
  classNames: ['mdc-menu-item'],

  classNameBindings: [
    'selected:mdc-menu-item--selected'
  ],
})
