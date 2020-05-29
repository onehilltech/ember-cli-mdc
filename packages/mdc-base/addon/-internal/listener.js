/**
 * The internal class for managing component listeners.
 */
export default class Listener {
  /// Name of the event being listened for.
  eventName;

  /// The method handling the event.
  method;

  constructor (eventName, method) {
    this.eventName = eventName;
    this.method = method;
  }

  /**
   * Listen for events on a material design component.
   *
   * @param mdcComponent
   */
  listen (mdcComponent) {
    mdcComponent.listen (this.eventName, this.method);
  }

  /**
   * Stop listening for events on the material design component.
   *
   * @param mdcComponent
   */
  unlisten (mdcComponent) {
    mdcComponent.unlisten (this.eventName, this.method);
  }
}
