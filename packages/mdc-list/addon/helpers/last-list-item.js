import { helper } from '@ember/component/helper';

export default helper(function lastListItem(params) {
  const [ arr, index ] = params;
  return index === arr.length - 1;
});
