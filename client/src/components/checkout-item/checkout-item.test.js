import React from "react";
import { shallow } from "enzyme";
import { useDispatch } from "react-redux";

import {
    clearItemFromCart,
    addItem,
    removeItem,
} from "../../redux/cart/cart.actions";

import CheckoutItem from "./checkout-item.component";

const mockDispatch = jest.fn();

jest.mock("react-redux", () => ({
    useDispatch: () => (mockDispatch)
}));

describe("CheckoutItem component", () => {
    const mockProps = {
        cartItem: {
            name: "Awesome jacket",
            imageUrl: "https://www.google.com",
            price: 299.99,
            quantity: 2
        }
    };

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<CheckoutItem {...mockProps} />);
    });

    it("should render the CheckoutItem component", () => {
        expect.assertions(1);
        expect(wrapper).toMatchSnapshot();
    });

    it("should dispatch the addItem action when the increment button is clicked", () => {
        expect.assertions(1);
        wrapper.find("[id='test-increment']").simulate("click");
        expect(mockDispatch).toHaveBeenCalledWith(addItem(mockProps.cartItem));
    });

    it("should dispatch the removeIte action when the decrement button is clicked", () => {
        expect.assertions(1);
        wrapper.find("[id='test-decrement']").simulate("click");
        expect(mockDispatch).toHaveBeenCalledWith(removeItem(mockProps.cartItem));
    });

    it("should call the clearItemFromCart action when the remove button is clicked", () => {
        expect.assertions(1);
        wrapper.find("RemoveButton").simulate("click");
        expect(mockDispatch).toHaveBeenCalledWith(clearItemFromCart(mockProps.cartItem));
    });
});