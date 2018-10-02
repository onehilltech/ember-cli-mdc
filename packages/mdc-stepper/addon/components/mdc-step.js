import Component from '@ember/component';
import layout from '../templates/components/mdc-step';

export default Component.extend({
  layout,

  tagName: 'li',

  classNames: ['mdc-step'],

  classNameBindings: ['optional:mdc-step--optional', 'editable:mdc-step--editable'],
});
