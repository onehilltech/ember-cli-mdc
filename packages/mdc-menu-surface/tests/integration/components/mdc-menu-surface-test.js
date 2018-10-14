import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('mdc-menu-surface', 'Integration | Component | mdc menu surface', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{mdc-menu-surface}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#mdc-menu-surface}}
      template block text
    {{/mdc-menu-surface}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
