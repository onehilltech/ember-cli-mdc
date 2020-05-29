import { assert } from '@ember/debug';
import MaterialComponent from './component';

/**
 * This is an internal function for listening to events from material components. The events
 * are transformed into callback methods on the component class. To observe an event, just
 * overload the appropriate event method on the component.
 */
export default function setupListener (eventName) {
  return function (target, key, desc) {
    assert ('The target must be an instance of MaterialComponent', (target instanceof MaterialComponent));
    target._registerMdcEventListener (eventName, key);
  }
}

