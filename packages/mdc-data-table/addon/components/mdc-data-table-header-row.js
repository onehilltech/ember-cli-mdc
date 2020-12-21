import Component from '@glimmer/component';

function isString (value) {
  return typeof value === 'string' || value instanceof String;
}

export default class MdcDataTableHeaderRowComponent extends Component {
  get headers () {
    return this.args.headers.map (header => isString (header) ? ({name: header}) : header);
  }
}
