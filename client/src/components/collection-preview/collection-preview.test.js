import React from "react";
import { shallow } from "enzyme";

import CollectionPreview from "./collection-preview.component";
import CollectionItem from "../collection-item/collection-item.component";

const mockPush = jest.fn();
const mockRouteMatch = { path: "/shop" };

jest.mock("react-router", () => ({
    ...jest.requireActual(),
    useHistory: () => {
        const push = path => mockPush(path);
        return { push }
    },
    useRouteMatch: () => (mockRouteMatch)
}));

describe("CollectionPreview component", () => {
    const items = [
        {
            id: 1,
            name: "Top hat",
            price: 250,
            imageUrl: "https://wwww.google.com"
        },
        {
            id: 2,
            name: "Ball cap",
            price: 120,
            imageUrl: "https://www.google.com"
        },
        {
            id: 3,
            name: "Bowler cap",
            price: 50,
            imageUrl: "https://wwww.google.com"
        },
        {
            id: 4,
            name: "Deerkiller hat",
            price: 500,
            imageUrl: "https://wwww.google.com"
        },
        {
            id: 5,
            name: "Knit cap",
            price: 600,
            imageUrl: "https://www.google.com"
        },
    ];

    const mockProps1 = {
        title: "Hats",
        items: items.slice(0, 3),
        routeName: "hats"
    };

    const mockProps2 = {
        ...mockProps1,
        items: items,
    };

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<CollectionPreview {...mockProps1} />);
    });


    it("should render the CollectionPreview component", () => {
        expect.assertions(1);
        expect(wrapper).toMatchSnapshot();
    });

    it("should call history.push with the right string when TitleContainer is clicked", () => {
        expect.assertions(1);
        wrapper.find("TitleHeader").simulate("click");

        expect(mockPush).toHaveBeenCalledWith(`${mockRouteMatch.path}/${mockProps1.routeName}`)
    });

    it("should render the same number of CollectionItem's as the number of items", () => {
        expect.assertions(1);

        expect(wrapper.find(CollectionItem).length).toEqual(3);
    });

    it("should only render a maximum of 4 items", () => {
        expect.assertions(1);

        let newWrapper = shallow(<CollectionPreview {...mockProps2} />);

        expect(newWrapper.find(CollectionItem).length).toEqual(4);
    });
});