import Component from '@ember/component';
import layout from '../templates/components/issue7-menu';

export default Component.extend({
  layout,

  classNames: ['issue7-menu'],

  classNameBindings: ['open:issue7-open'],

  open: false,

  isOpenComplete: false,

  _transitionEndListener: null,

  init () {
    this._super (...arguments);

    this._transitionEndListener = this._transitionEnd.bind (this);
  },

  didInsertElement () {
    this._super (...arguments);

    // Listen for the transition end event.
    this.element.addEventListener ('transitionend', this._transitionEndListener);
  },

  _transitionEnd () {
    // Update the open complete state.
    const isOpenComplete = this.element.classList.contains ('issue7-open');
    this.set ('isOpenComplete', isOpenComplete);
  }
});
