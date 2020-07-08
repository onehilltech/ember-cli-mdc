import Component from '@glimmer/component';
import { assert } from '@ember/debug';

const ALIGNMENTS = ['right', 'left'];

export default class MdcLayoutGridComponent extends Component {
  get alignmentClassName () {
    assert (`The alignment must be one of the following values.`, ALIGNMENTS.includes (this.args.alignment));
    return `mdc-layout-grid--align-${this.args.alignment}`;
  }
}
