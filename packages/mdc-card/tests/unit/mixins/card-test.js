import EmberObject from '@ember/object';
import CardMixin from 'ember-cli-mdc-card/mixins/card';
import { module, test } from 'qunit';

module('Unit | Mixin | card', function() {
  // Replace this with your real tests.
  test('it works', function (assert) {
    let CardObject = EmberObject.extend(CardMixin);
    let subject = CardObject.create();
    assert.ok(subject);
  });
});
