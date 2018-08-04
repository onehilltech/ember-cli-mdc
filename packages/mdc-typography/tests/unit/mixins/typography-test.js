import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { Typography } from 'ember-cli-mdc-typography';
import Object from '@ember/object';

module ('-internal | Mixins | Theme', function (hooks) {
  setupTest (hooks);

  test ('should update the mdcTypographyClassName', function (assert) {
    const MockObject = Object.extend (Typography);

    const mock = MockObject.create ();
    assert.deepEqual (mock.get ('classNameBindings'), ['mdcTypographyClassName']);

    mock.set ('typography', 'headline1');

    assert.equal (mock.get ('mdcTypographyClassName'), 'mdc-typography--headline1');
  });
});