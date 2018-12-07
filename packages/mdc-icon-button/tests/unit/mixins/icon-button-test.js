import EmberObject from '@ember/object';
import IconButtonMixin from 'ember-cli-mdc-icon-button/mixins/icon-button';
import { module, test } from 'qunit';

module('Unit | Mixin | icon-button', function() {
  // Replace this with your real tests.
  test('it works', function (assert) {
    let IconButtonObject = EmberObject.extend(IconButtonMixin);
    let subject = IconButtonObject.create();
    assert.ok(subject);
  });
});
