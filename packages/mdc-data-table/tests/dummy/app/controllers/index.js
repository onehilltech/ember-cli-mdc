import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    rowSelectionChange ({detail}) {
      console.log (detail);
    }
  }
});
