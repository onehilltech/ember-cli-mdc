import Mixin from '@ember/object/mixin';

export default Mixin.create({
  classNames: ['mdc-card'],
  classNameBindings: ['outlined:mdc-card--outlined'],

  outlined: false
});
