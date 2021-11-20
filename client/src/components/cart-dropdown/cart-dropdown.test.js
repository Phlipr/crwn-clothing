import React from "react";
import { shallow } from "enzyme";
import * as reactRedux from "react-redux";

import CartDropdown from "./cart-dropdown.component";
import CartItem from "../cart-item/cart-item.component";

import { toggleCartHidden } from "../../redux/cart/cart.actions";
import { selectCartItems } from "../../redux/cart/cart.selectors";

// mocking the useHistory hook
const mockPush = jest.fn();
jest.mock("react-router-dom", () => ({
    useHistory: () => {
        const push = () => mockPush();
        return { push };
    },
}));

// setting up mock for react-redux hooks
const mockDispatch = jest.fn();

const mockCartItems = [
    { id: 1 },
    { id: 2 },
    { id: 3 }
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

describe("CartDropdown component", () => {
    let wrapper;
    const mockUseSelector = reactRedux.useSelector;

    it("should render CartDropdown component", () => {
        expect.assertions(1);
        mockUseSelector.mockImplementation(selector => selector(mockStore));
        wrapper = shallow(<CartDropdown />);
        expect(wrapper).toMatchSnapshot();
    });

    it("should call history.push when button is clicked", () => {
        expect.assertions(2);
        wrapper.find("CartDropdownButton").simulate("click");
        expect(mockPush).toHaveBeenCalled();
        expect(mockDispatch).toHaveBeenCalledWith(toggleCartHidden());
    });

    it("should render the same number of CartItems as included in the cartItems", () => {
        expect.assertions(1);
        mockUseSelector.mockImplementation(selector => selector(mockStore));
        wrapper = shallow(<CartDropdown />);
        expect(wrapper.find(CartItem).length).toEqual(mockCartItems.length);
    });

    it("should render EmptyMessageContainer if cartItems is empty", () => {
        expect.assertions(1);
        mockUseSelector.mockImplementation(selector => selector(mockStoreWithEmptyCart));
        wrapper = shallow(<CartDropdown />);
        expect(wrapper.exists("EmptyMessageContainer")).toBe(true);
    });
});
