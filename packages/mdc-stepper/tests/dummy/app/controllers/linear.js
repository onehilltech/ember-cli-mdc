import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    complete () {
      alert ('The stepper is complete!');
    }
  }
});
