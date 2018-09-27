import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('mdc-filter-chip-set', 'Integration | Component | mdc filter chip set', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{mdc-filter-chip-set}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#mdc-filter-chip-set}}
      template block text
    {{/mdc-filter-chip-set}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
