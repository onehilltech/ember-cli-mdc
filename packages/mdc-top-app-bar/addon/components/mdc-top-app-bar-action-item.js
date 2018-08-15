import Component from '@ember/component';
import layout from '../templates/components/mdc-top-app-bar-action-item';

export default Component.extend({
  layout,

  tagName: 'a',

  classNames: ['material-icons', 'mdc-top-app-bar__action-item'],

  attributeBindings: ['label:aria-label', 'alt'],

  label: null,

  alt: null,

  icon: null,

  didInsertElement () {
    this._super (...arguments);

    this.element.setAttribute ('href', '#');
  }
});
