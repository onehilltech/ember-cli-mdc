import Component from '@ember/component';
import layout from '../templates/components/mdc-list-item';

export default Component.extend({
  layout,

  tagName: 'li',

  classNames: ['mdc-list-item'],

  classNameBindings: ['selected:mdc-list-item--selected', 'activated:mdc-list-item--activated'],

  selected: false,
  activated: false,

  didRender () {
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
