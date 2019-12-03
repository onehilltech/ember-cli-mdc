import Component from '@ember/component';
import layout from '../templates/components/sa-inner-component';

export default Component.extend({
  classNames: ['sa-inner-component'],

  layout,

  actions: {
    undo () {
      alert ('The undo button was pressed!');
    },

    manual () {
      this.snackbar ( {
        message: 'This was manually sent from the component.',
        dismissible: true,
        action: {
          text: 'Confirm',
          handler () {
            alert ('We did it!');
          }
        }
      });
    }
  }
});
