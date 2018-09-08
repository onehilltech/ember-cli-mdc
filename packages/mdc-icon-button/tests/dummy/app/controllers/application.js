import Controller from '@ember/controller';

export default Controller.extend({
  on: false,

  actions: {
    toggle () {
      this.toggleProperty ('on');
    }
  }
});
