import React, { useEffect, lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import HomePage from "./pages/homepage/homepage.component";
import Header from "./components/header/header.component";
import Spinner from "./components/spinner/spinner.component";

import { GlobalStyles } from "./global.styles";

import { selectCurrentUser } from "./redux/user/user.selectors";
import { checkUserSession } from "./redux/user/user.actions";

// Lazy loaded components
const ShopPage = lazy(() => import("./pages/shop/shop.component"));
const SignInAndSignUp = lazy(() => import("./pages/sign-in-and-sign-up/sign-in-and-sign-up.component"));
const CheckoutPage = lazy(() => import("./pages/checkout/checkout.component"));

const App = () => {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);

  return (
    <div>
      <GlobalStyles />
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Suspense fallback={<Spinner />} >
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route
            path="/signin"
            render={() =>
              currentUser ? <Redirect to="/" /> : <SignInAndSignUp />
            }
          />
        </Suspense>
      </Switch>
    </div>
  );
};

export default App;
