import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('mdc-stepper', 'Integration | Component | mdc stepper', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{mdc-stepper}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#mdc-stepper}}
      template block text
    {{/mdc-stepper}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
