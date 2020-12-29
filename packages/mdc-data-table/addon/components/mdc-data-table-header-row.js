import Component from '@glimmer/component';
import isString from '../utils/is-string';

export default class MdcDataTableHeaderRowComponent extends Component {
  get headers () {
    return this.args.headers.map (header => isString (header) ? ({name: header}) : header);
  }
}
