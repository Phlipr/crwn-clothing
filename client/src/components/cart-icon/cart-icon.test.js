import React from "react";
import { shallow, mount } from "enzyme";
import * as reactRedux from "react-redux";

import CartIcon from "./cart-icon.component";

import { toggleCartHidden } from "../../redux/cart/cart.actions";
import { selectCartItemsCount } from "../../redux/cart/cart.selectors";

// setting up mock for react-redux hooks
const mockDispatch = jest.fn();

const mockCartItems = [
    { id: 1, quantity: 1 },
    { id: 2, quantity: 1 },
    { id: 3, quantity: 1 }
];

const mockStore = {
    cart: {
        cartItems: mockCartItems
    }
}

const mockStoreWithEmptyCart = {
    cart: {
        cartItems: []
    }
}
jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useSelector: jest.fn(),
    useDispatch: () => (mockDispatch)
}));

describe("CartIcon component", () => {
    let wrapper;
    const mockUseSelector = reactRedux.useSelector;

    it("should render CartIcon component", () => {
        expect.assertions(1);
        mockUseSelector.mockImplementation(selector => selector(mockStore));
        wrapper = shallow(<CartIcon />);
        expect(wrapper).toMatchSnapshot();
    });

    it("should render an item count with the same number of CartItems as included in the cartItems", () => {
        expect.assertions(2);
        mockUseSelector.mockImplementation(selector => selector(mockStore));
        wrapper = mount(<CartIcon />);
        expect(wrapper.find("ItemCountContainer").text()).toEqual("3");
        mockUseSelector.mockClear();
        mockUseSelector.mockImplementation(selector => selector(mockStoreWithEmptyCart));
        wrapper = mount(<CartIcon />);
        expect(wrapper.find("ItemCountContainer").text()).toEqual("0");
    });

    it("should call dispatch with the toggleCartHidden action when clicked", () => {
        expect.assertions(1);
        wrapper.find("CartIconContainer").simulate("click");
        expect(mockDispatch).toHaveBeenCalledWith(toggleCartHidden());
    });
});