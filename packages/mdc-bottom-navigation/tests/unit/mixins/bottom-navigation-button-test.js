import EmberObject from '@ember/object';
import BottomNavigationButtonMixin from 'ember-cli-mdc-bottom-navigation/mixins/bottom-navigation-button';
import { module, test } from 'qunit';

module('Unit | Mixin | bottom-navigation-button', function() {
  // Replace this with your real tests.
  test('it works', function (assert) {
    let BottomNavigationButtonObject = EmberObject.extend(BottomNavigationButtonMixin);
    let subject = BottomNavigationButtonObject.create();
    assert.ok(subject);
  });
});
