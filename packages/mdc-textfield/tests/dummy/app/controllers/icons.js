import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    leadingIconClick () {
      alert ('Leading icon clicked!');
    },

    trailingIconClick () {
      alert ('Trailing icon clicked');
    }
  }
});
