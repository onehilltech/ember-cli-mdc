import Controller from '@ember/controller';
import { map } from '@ember/object/computed';

export default Controller.extend ({
  names: map ('filtered', function (id) {
    return this.get ('filterChips').findBy ('id', id).text;
  }),

  dynamicChips: null,

  actions: {
    submit () {
      const { dynamicChips, chipLabel: text } = this.getProperties (['dynamicChips', 'chipLabel']);
      dynamicChips.pushObject ({text});

      return false;
    },

    makeInputChip (value) {
      return {text: value, iconTrailing: 'cancel'};
    }
  }
});
