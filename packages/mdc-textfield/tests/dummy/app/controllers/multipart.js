import Controller from '@ember/controller';
import { isEmpty } from '@ember/utils';
import { empty, not } from '@ember/object/computed';
import { computed } from '@ember/object';

const CARD_METADATA = {
  3: {formatter: [4, 6, 5], cvc: 4, length: 17},           // American Express
  4: {formatter: [4, 4, 4, 4], cvc: 3, length: 19},        // Visa
  5: {formatter: [4, 4, 4, 4], cvc: 3, length: 19},        // Mastercard
  6: {formatter: [4, 4, 4, 4], cvc: 3, length: 19}         // Discover
};

export default Controller.extend({
  noNumber: empty ('number'),

  hasNumber: not ('noNumber'),

  metadata: computed ('number', function () {
    const number = this.number;
    return isEmpty (number) ? null : CARD_METADATA[number[0]]
  }),

  _sanitizeCardNumber (value) {
    return value.replace (/[\D]+/g, '');
  },

  actions: {
    formatCardNumber ({target}) {
      if (isEmpty (target.value) || isEmpty (this.metadata)) {
        return;
      }

      // First, sanitize the card number by removing all non-digit characters.
      const value = target.value.replace (/[\D]+/g, '');

      // Now, format the card number by creating groups of numbers.
      const formatter = this.metadata.formatter;

      const result = formatter.reduce (({chunks, unformatted}, size) => {
        if (isEmpty (unformatted)) {
          return {chunks, unformatted};
        }

        chunks.push (unformatted.splice (0, size).join (''));

        return {chunks, unformatted};
      }, {unformatted: value.split (''), chunks: []});

      target.value = result.chunks.join (' ');
    }
  }
});
