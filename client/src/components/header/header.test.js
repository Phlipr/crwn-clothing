import React from "react";
import { shallow } from "enzyme";

import Header from "./header.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";

import { signOutStart } from "../../redux/user/user.actions";
import { useSelector } from "react-redux";

const mockDispatch = jest.fn();

jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useSelector: jest.fn(),
    useDispatch: () => (mockDispatch)
}));

describe("Header component:", () => {
    const mockStateWithHiddenTrue = {
        user: {
            currentUser: {
                displayName: "Phillip",
                email: "preynolds1406@gmail.com",
                createdAt: "11/24/2021"
            }
        },
        cart: {
            hidden: true
        }
    };

    const mockStateWithHiddenFalse = {
        ...mockStateWithHiddenTrue,
        cart: {
            hidden: false
        }
    };

    const mockStateWithNoCurrentUser = {
        ...mockStateWithHiddenTrue,
        user: {
            currentUser: null
        }
    };

    let wrapper;

    it("should render the Header component", () => {
        expect.assertions(1);

        useSelector.mockImplementation(selector => selector(mockStateWithHiddenTrue));

        wrapper = shallow(<Header />);

        expect(wrapper).toMatchSnapshot();
    });

    it("should render appropriate sign-in/out button in header", () => {
        expect.assertions(4);

        useSelector.mockImplementation(selector => selector(mockStateWithNoCurrentUser));

        wrapper = shallow(<Header />);

        expect(wrapper.find("[id='test-sign-in']").exists()).toBe(true);
        expect(wrapper.find("[id='test-sign-out']").exists()).toBe(false);

        useSelector.mockClear();

        useSelector.mockImplementation(selector => selector(mockStateWithHiddenTrue));

        wrapper = shallow(<Header />);

        expect(wrapper.find("[id='test-sign-in']").exists()).toBe(false);
        expect(wrapper.find("[id='test-sign-out']").exists()).toBe(true);
    });

    it("should render the CartDropDown component only if the hidden is false", () => {
        expect.assertions(2);

        useSelector.mockImplementation(selector => selector(mockStateWithHiddenTrue));

        wrapper = shallow(<Header />);

        expect(wrapper.find(CartDropdown).exists()).toBe(false);

        useSelector.mockClear();

        useSelector.mockImplementation(selector => selector(mockStateWithHiddenFalse));

        wrapper = shallow(<Header />);

        expect(wrapper.find(CartDropdown).exists()).toBe(true);
    });

    it("should dispatch the signOutStart action when the sign out button is clicked", () => {
        expect.assertions(1);

        wrapper.find("[id='test-sign-out']").simulate("click");

        expect(mockDispatch).toBeCalledWith(signOutStart());
    });
});