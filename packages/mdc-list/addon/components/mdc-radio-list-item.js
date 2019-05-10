import ListItemComponent from '@ember/component';

export default ListItemComponent.extend({
  role: 'radio',

  checked: false,

  didInsertElement () {
    this._super (...arguments);

    // Set the initial checked value for the list item.
    let checked = this.get ('checked');
    this.element.setAttribute ('aria-checked', checked);
  }
});
