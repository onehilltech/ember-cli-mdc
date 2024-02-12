/**
 * The internal class for managing component listeners.
 */
export default class Listener {
  /// Name of the event being listened for.
  eventName;

  /// The handler handling the event.
  method;

  constructor(eventName, method) {
    this.eventName = eventName;
    this.method = method;
  }

  /**
   * Listen for events on a material design component.
   *
   * @param component
   */
  listen(component) {
    this.handler = this.method.bind(component);
    component.listen(this.eventName, this.handler);
  }

  /**
   * Stop listening for events on the material design component.
   *
   * @param component
   */
  unlisten(component) {
    component.unlisten(this.eventName, this.handler);
  }
}
