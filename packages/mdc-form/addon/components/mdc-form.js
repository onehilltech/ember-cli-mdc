import Component from '@glimmer/component';

import { action } from '@ember/object';
import { debounce } from '@ember/runloop';

function noOp () { }

export default class MdcFormComponent extends Component {
  constructor () {
    super (...arguments);

    this.checkValidityEventListener_ = this.doCheckValidity.bind (this);
    this.submitEventListener_ = this.didSubmit.bind (this);
    this.resetEventListener_ = this.didReset.bind (this);
  }

  _formElement = null;

  get delay () {
    return this.args.delay || 150;
  }

  valid = false;

  get invalid () {
    return !this.valid;
  }

  @action
  didInsert (element) {
    this._formElement = element;
    element.addEventListener ('input', this.checkValidityEventListener_);
    element.addEventListener ('submit', this.submitEventListener_);
    element.addEventListener ('reset', this.resetEventListener_);

    this.doCheckValidity ();
  }

  willDestroy () {
    super.willDestroy ();

    this._formElement.removeEventListener ('input', this.checkValidityEventListener_);
    this._formElement.removeEventListener ('submit', this.submitEventListener_);
    this._formElement.removeEventListener ('reset', this.resetEventListener_);
  }

  /**
   * The submit button was pressed. By default, we prevent the default action from
   * happening because form submission in EmberJS happens behind the scenes.
   *
   * @param ev
   */
  didSubmit (ev) {
    // Prevent the default event.
    ev.preventDefault ();

    // Manually call submit.
    this.submit (ev);
  }

  /**
   * The reset button was pressed. By default, we prevent the default action from
   * happening because form submission in EmberJS happens behind the scenes.
   *
   * @param ev
   */
  didReset (ev) {
    // Prevent the default event.
    ev.preventDefault ();

    // Manually call reset.
    this.reset (ev);
  }

  checkValidityEventListener_ = null;
  submitEventListener_ = null;
  resetEventListener_ = null;

  /**
   * Continuously report the validity.
   */
  doCheckValidity () {
    let delay = this.delay;
    debounce (this, this._doCheckValidity, delay);
  }

  _doCheckValidity ( ) {
    let valid = this._formElement.checkValidity ();

    // Update the invalid state of the form. This will also components inside
    // the form to update its state based on the forms validity.
    this.valid = valid;

    // Notify the parent of our state. The client could listen to the change event
    // that bubbles up to the form, but that requires creating an action that can
    // extract the forms validity. This is just a shortcut approach for the client.
    this.validity (valid);
  }

  get validity () {
    return this.args.validity || noOp;
  }

  get submit () {
    return this.args.submit || noOp;
  }

  get reset () {
    return this.args.reset || noOp;
  }
}
