import Component from 'ember-cli-mdc-base/component';
import listener  from 'ember-cli-mdc-base/listener';

export default class DummyComponent extends Component {
  @listener('event1')
  handleEvent1 (ev) {

  }

  @listener('event2')
  handleEvent2 (ev) {

  }
}
