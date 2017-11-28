import * as fromUser from '../actions/user-action';

export interface UserInfo {
  name: string;
  company: string;
  postcode: string;
}

export const  initialState: UserInfo = {
    name: 'test',
    company: 'test',
    postcode: 'test',
};

export function reducer(state = initialState, action: any): UserInfo {
  switch (action.type) {
    case fromUser.GET_USER_INFO:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}
