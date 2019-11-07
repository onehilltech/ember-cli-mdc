import EmberObject from '@ember/object';
import CellMixin from 'ember-cli-mdc-data-table/mixins/cell';
import { module, test } from 'qunit';

module('Unit | Mixin | cell', function() {
  // Replace this with your real tests.
  test('it works', function (assert) {
    let CellObject = EmberObject.extend(CellMixin);
    let subject = CellObject.create();
    assert.ok(subject);
  });
});
