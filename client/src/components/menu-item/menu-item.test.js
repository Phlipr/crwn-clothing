import React from "react";
import { shallow } from "enzyme";

import MenuItem from "./menu-item.component";

const mockPush = jest.fn();
const mockRouteMatch = { url: "/shop" };

jest.mock("react-router-dom", () => ({
    ...jest.requireActual(),
    useHistory: () => {
        const push = url => mockPush(url);
        return { push };
    },
    useRouteMatch: () => (mockRouteMatch),
}));

describe("MenuItem component:", () => {
    let wrapper;
    const mockProps = {
        title: "Hats",
        imageUrl: "https://www.google.com",
        size: "large",
        linkUrl: "/hats"
    }

    beforeEach(() => {
        wrapper = shallow(<MenuItem {...mockProps} />);
    });

    it("should render the MenuItem component", () => {
        expect.assertions(1);
        expect(wrapper).toMatchSnapshot();
    });

    it("should push the correct route to history when the MenuItemContainer is clicked", () => {
        expect.assertions(1);

        wrapper.find("MenuItemContainer").simulate("click");

        expect(mockPush).toHaveBeenCalledWith(`${mockRouteMatch.url}${mockProps.linkUrl}`);
    });

    it("should pass the size prop to the MenuItemContainer", () => {
        expect.assertions(1);

        expect(wrapper.find("MenuItemContainer").prop("size")).toEqual(mockProps.size);
    });

    it("should pass the imageUrl to the BackgroundImageContainer", () => {
        expect.assertions(1);

        expect(wrapper.find("BackgroundImageContainer").prop("imageUrl")).toEqual(mockProps.imageUrl);
    });
});