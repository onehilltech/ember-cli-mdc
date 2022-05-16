import Modifier from 'ember-cli-mdc-base/modifier';
import { ModifierState } from 'ember-cli-mdc-base/modifier';
import { action } from '@ember/object';

const { random, round } = Math;
const DEFAULT_DELAY = 1000;

class MovingState extends ModifierState {
  intervalId;

  get delay() {
    return this.args.named.delay || DEFAULT_DELAY;
  }

  didEnterState() {
    this.intervalId = setInterval(this.moveElement, this.delay);
  }

  willExitState() {
    clearInterval(this.intervalId);
  }

  didReceiveArguments() {
    this.changeState(new MovingState());
  }

  @action moveElement() {
    let top = round(random() * 500);
    let left = round(random() * 500);
    this.element.style.transform = `translate(${left}px, ${top}px)`;
  }

  willRemove() {
    this.willExitState();
  }
}

class NotMovingState extends ModifierState {
  didInstall() {
    this.changeState(new MovingState());
  }
}

export default class MoveRandomlyModifier extends Modifier {
  createInitialState() {
    return new NotMovingState();
  }
}
