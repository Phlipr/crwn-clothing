import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import StripeCheckoutButton from "../../components/stripe-button/stripe-button.component";

import {
  selectCartItems,
  selectCartTotal,
} from "../../redux/cart/cart.selectors";

import {
  CheckoutPageContainer,
  CheckoutHeader,
  HeaderBlock,
  TotalStyles,
  ButtonStyles,
  TestWarningContainer
} from "./checkout.styles";

const CheckoutPage = ({ cartItems, total }) => (
  <CheckoutPageContainer>
    <CheckoutHeader>
      <HeaderBlock>
        <span>Product</span>
      </HeaderBlock>
      <HeaderBlock>
        <span>Description</span>
      </HeaderBlock>
      <HeaderBlock>
        <span>Quantity</span>
      </HeaderBlock>
      <HeaderBlock>
        <span>Price</span>
      </HeaderBlock>
      <HeaderBlock>
        <span>Remove</span>
      </HeaderBlock>
    </CheckoutHeader>
    {cartItems.map((cartItem) => (
      <CheckoutItem key={cartItem.id} cartItem={cartItem} />
    ))}

    <TotalStyles>
      <span>TOTAL: ${total}</span>
    </TotalStyles>
    <TestWarningContainer>
      *Please use the following test card for payments*
      <br />
      4242 4242 4242 4242 - Exp: Any future date - CVV: 123
    </TestWarningContainer>
    <ButtonStyles>
      <StripeCheckoutButton price={total} />
    </ButtonStyles>
  </CheckoutPageContainer>
);

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal,
});

export default connect(mapStateToProps)(CheckoutPage);
