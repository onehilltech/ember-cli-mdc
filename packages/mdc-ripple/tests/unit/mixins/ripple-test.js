import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { Ripple } from 'ember-cli-mdc-ripple';
import Object from '@ember/object';

module('-internal | Mixins | Ripple', function (hooks) {
  setupTest (hooks);

  test ('should update the mdcRippleColorClassName', function (assert) {
    const MockObject = Object.extend (Ripple);

    const mock = MockObject.create ();
    assert.deepEqual (mock.get ('classNames'), ['mdc-ripple-surface']);
    assert.deepEqual (mock.get ('classNameBindings'), ['mdcRippleColorClassName']);

    mock.set ('rippleColor', 'accent');

    assert.equal ('mdc-ripple-surface--accent', mock.get ('mdcRippleColorClassName'));
  });
});