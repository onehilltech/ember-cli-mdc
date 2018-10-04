import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('mdc-linear-progress-bar', 'Integration | Component | mdc linear progress bar', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{mdc-linear-progress-bar}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#mdc-linear-progress-bar}}
      template block text
    {{/mdc-linear-progress-bar}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
