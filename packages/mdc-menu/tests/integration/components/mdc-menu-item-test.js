import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('mdc-menu-item', 'Integration | Component | mdc menu item', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{mdc-menu-item}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#mdc-menu-item}}
      template block text
    {{/mdc-menu-item}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
