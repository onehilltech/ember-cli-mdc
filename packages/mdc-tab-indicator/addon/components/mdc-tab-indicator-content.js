import Component from '@ember/component';
import layout from '../templates/components/mdc-tab-indicator-content';

export default Component.extend ({
  tagName: 'span',

  layout,

  classNames: ['mdc-tab-indicator__content'],

  classNameBindings: [
    'icon:mdc-tab-indicator__content--icon:mdc-tab-indicator__content--underline',
    'icon:material-icons'
  ],

  icon: null
});
