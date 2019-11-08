import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('mdc-menu-item-link-to', 'Integration | Component | mdc menu item link to', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{mdc-menu-item-link-to}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#mdc-menu-item-link-to}}
      template block text
    {{/mdc-menu-item-link-to}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
