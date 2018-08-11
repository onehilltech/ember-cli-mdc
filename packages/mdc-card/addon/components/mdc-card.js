import Component from '@ember/component';
import layout from '../templates/components/mdc-card';

export default Component.extend({
  layout,

  classNames: ['mdc-card'],
  classNameBindings: ['outlined:mdc-card--outlined'],

  outlined: false,
});
