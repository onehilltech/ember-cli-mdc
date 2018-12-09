import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    accept () {
      alert (this.get ('value'));
    }
  }
});
