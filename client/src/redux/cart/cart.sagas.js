import { all, call, takeLatest, put, select } from "redux-saga/effects";

import UserActionTypes from "../user/user.types";
import { selectCurrentUser } from "../user/user.selectors";
import { selectCartItems } from "./cart.selectors";
import { checkoutCartFromFirebase, clearCart } from "./cart.actions";
import { getCartRefForUser } from "../../firebase/firebase.utils";
import CartActionTypes from "./cart.types";

export function* clearCartOnSignOut() {
  yield put(clearCart());
}

export function* updateCartInFirestore() {
  const currentUser = yield select(selectCurrentUser);

  if (currentUser) {
    try {
      const cartsRef = yield getCartRefForUser(currentUser.id);
      const cartItems = yield select(selectCartItems);
      yield cartsRef.update({ cartItems });
    } catch (error) {
      console.log(error);
    }
  }
}

export function* getCartItemsFromFirebase({ payload: user }) {
  const cartsRef = yield getCartRefForUser(user.id);
  const snapShot = yield cartsRef.get();
  yield put(checkoutCartFromFirebase(snapShot.data().cartItems));
}

export function* onSignOutSuccess() {
  yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut);
}

export function* onSignInSuccess() {
  yield takeLatest(UserActionTypes.SIGN_IN_SUCCESS, getCartItemsFromFirebase);
}

export function* onCartChange() {
  yield takeLatest([
    CartActionTypes.REMOVE_ITEM,
    CartActionTypes.ADD_ITEM,
    CartActionTypes.CLEAR_ITEM_FROM_CART
  ],
    updateCartInFirestore
  );
}

export function* cartSagas() {
  yield all([call(onSignOutSuccess), call(onSignInSuccess), call(onCartChange)]);
}
