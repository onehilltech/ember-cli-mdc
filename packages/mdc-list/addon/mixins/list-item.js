import Mixin from '@ember/object/mixin';

export default Mixin.create ({
  classNames: ['mdc-list-item'],

  classNameBindings: ['selected:mdc-list-item--selected', 'activated:mdc-list-item--activated'],

  selected: false,

  activated: false,

  didInsertElement () {
    this._super (...arguments);

    if (this.get ('selected')) {
      this.element.setAttribute ('aria-selected', true);
      this.element.setAttribute ('tabindex', 0);
    }
    else {
      this.element.removeAttribute ('aria-selected');
      this.element.removeAttribute ('tabindex');
    }
  }
});
