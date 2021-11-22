import React from "react";
import { shallow } from "enzyme";

import CollectionItem from "./collection-item.component";

import { addItem } from "../../redux/cart/cart.actions";

const mockDispatch = jest.fn();

jest.mock("react-redux", () => ({
    useDispatch: () => (mockDispatch)
}));

describe("CollectionItem component", () => {
    const mockProps = {
        item: {
            name: "Item #1",
            price: 2.50,
            imageUrl: "https://www.google.com"
        }
    };

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<CollectionItem {...mockProps} />);
    });

    it("should render the CollectionItem component", () => {
        expect.assertions(1);
        expect(wrapper).toMatchSnapshot();
    });

    it("should dispatch the addItem action when the AddButton is clicked", () => {
        expect.assertions(1);
        wrapper.find("AddButton").simulate("click");
        expect(mockDispatch).toHaveBeenCalledWith(addItem(mockProps.item));
    });

    it("should set the background image to the imageUrl", () => {
        expect.assertions(1);
        expect(wrapper.find("BackgroundImageContainer").prop("imageUrl")).toBe(mockProps.item.imageUrl);
    });
});