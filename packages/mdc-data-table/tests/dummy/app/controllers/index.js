import Controller from '@ember/controller';
import { A } from '@ember/array';

export default Controller.extend({
  actions: {
    rowSelectionChange ({detail}) {
      console.log (detail);
    }
  }
});
