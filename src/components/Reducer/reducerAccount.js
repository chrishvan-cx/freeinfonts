import Cookies from "js-cookie";

function reducerAccount(initialState, action) {
  switch (action.type) {
    case 'register':
      Cookies.remove('account');
      initialState = action.info
      Cookies.set('account',JSON.stringify(initialState));
      localStorage.setItem("account",JSON.stringify(initialState) );
      window.location.reload("true");
      return initialState;
    default: return '';
  }
}
export default reducerAccount;