import Controller from '@ember/controller';

export default Controller.extend({
  exited: false,

  actions: {
    toggleExited () {
      this.toggleProperty ('exited');
    }
  }
});
