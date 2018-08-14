import Component from '@ember/component';
import layout from '../templates/components/mdc-dialog-header';

export default Component.extend({
  layout,

  tagName: 'header',

  classNames: ['mdc-dialog__header'],

  /// The dialog title displayed in the header.
  title: null
});
