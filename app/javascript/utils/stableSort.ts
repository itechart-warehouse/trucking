import { Order } from '../mixins/initialValues/userList';
import {
  Consignment, User, UserLogs, Waybill, WriteOffAct,
} from '../common/interfaces_types';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
    // eslint-disable-next-line no-unused-vars
    a: { [key in Key]: any },
    // eslint-disable-next-line no-unused-vars
    b: { [key in Key]: any},
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
// eslint-disable-next-line no-unused-vars
export function stableSort<T>(
  array: User[] | Consignment[] | Waybill[] | WriteOffAct[] | UserLogs[] | string[],
  // eslint-disable-next-line no-unused-vars
  comparator: (a: T, b: T) => number,
) {
  const stabilizedThis = array.map((el, index) => [el, index] as unknown as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}
