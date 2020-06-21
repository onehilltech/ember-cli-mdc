/**
 * The internal class for managing component listeners.
 */
export default class Listener {
  /// Name of the event being listened for.
  eventName;

  /// The handler handling the event.
  handler;

  constructor (eventName, handler) {
    this.eventName = eventName;
    this.handler = handler;
  }

  /**
   * Listen for events on a material design component.
   *
   * @param mdcComponent
   */
  listen (mdcComponent) {
    mdcComponent.listen (this.eventName, this.handler);
  }

  /**
   * Stop listening for events on the material design component.
   *
   * @param mdcComponent
   */
  unlisten (mdcComponent) {
    mdcComponent.unlisten (this.eventName, this.handler);
  }
}
