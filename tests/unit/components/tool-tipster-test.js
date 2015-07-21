import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('tool-tipster', 'Unit | Component | tool tipster', {
  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar'],
});

test('it renders well', function(assert) {
  assert.expect(2);

  // Creates the component instance
  var component = this.subject();
  assert.equal(component._state, 'preRender');

  // Renders the component to the page
  this.render();
  assert.equal(component._state, 'inDOM');
});

test('it updates its content dynamically', function (assert) {
  var component = this.subject({
    title: 'foo',
    delay: 0
  });

  this.render();
  this.$().trigger('mouseenter');
  assert.equal($('.tooltipster-content').text(), 'foo');

  Ember.run(this, function () {
    component.set('title', 'bar');
  });
  this.$().trigger('mouseenter');
  assert.equal($('.tooltipster-content').text(), 'bar');
});
