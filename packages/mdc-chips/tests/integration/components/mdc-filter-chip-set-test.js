import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | mdc filter chip set', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs`{{mdc-filter-chip-set}}`);

    assert.dom('*').hasText('');

    // Template block usage:
    await render(hbs`
      {{#mdc-filter-chip-set}}
        template block text
      {{/mdc-filter-chip-set}}
    `);

    assert.dom('*').hasText('template block text');
  });
});
