import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('mdc-linear-progress-bar-inner', 'Integration | Component | mdc linear progress bar inner', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{mdc-linear-progress-bar-inner}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#mdc-linear-progress-bar-inner}}
      template block text
    {{/mdc-linear-progress-bar-inner}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
