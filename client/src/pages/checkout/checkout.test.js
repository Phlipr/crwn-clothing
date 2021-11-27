import React from "react";
import { shallow } from "enzyme";
import { useSelector } from "react-redux";

import CheckoutPage from "./checkout.component";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";

jest.mock("react-redux", () => ({
    ...jest.requireActual(),
    useSelector: jest.fn()
}));

describe("CheckoutPage component", () => {
    const mockStateWithFullCart = {
        cart: {
            cartItems: [
                {
                    id: 1,
                    quantity: 2
                },
                {
                    id: 2,
                    quantity: 3
                }
            ]
        },
    };

    const mockStateWithEmptyCart = {
        cart: {
            cartItems: []
        }
    };

    let wrapper;

    it("should render the CheckoutPage component", () => {
        expect.assertions(1);

        useSelector.mockImplementation(selector => selector(mockStateWithFullCart));

        wrapper = shallow(<CheckoutPage />);

        expect(wrapper).toMatchSnapshot();
    });

    it("should render the same number of CheckoutItems as those in cartItems", () => {
        expect.assertions(1);

        expect(wrapper.find(CheckoutItem).length).toEqual(mockStateWithFullCart.cart.cartItems.length);
    });

    it("should not render any CheckoutItems if the cartItems is empty", () => {
        expect.assertions(1);

        useSelector.mockImplementation(selector => selector(mockStateWithEmptyCart));

        wrapper = shallow(<CheckoutPage />);

        expect(wrapper.exists(CheckoutItem)).toBe(false);
    });
});