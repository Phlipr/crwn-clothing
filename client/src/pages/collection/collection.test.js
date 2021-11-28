import React from "react";
import { shallow } from "enzyme";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import CollectionPage from "./collection.component";
import CollectionItem from "../../components/collection-item/collection-item.component";

import { selectCollection } from "../../redux/shop/shop.selectors";
import { before } from "lodash";

jest.mock("react-redux", () => ({
    ...jest.requireActual(),
    useSelector: jest.fn()
}));

jest.mock("react-router-dom", () => ({
    ...jest.requireActual(),
    useParams: jest.fn()
}));

describe("CollectionPage component:", () => {
    const mockState = {
        shop: {
            collections: {
                sneakers: {
                    id: 1,
                    title: "sneakers",
                    items: [
                        {
                            id: 1,
                            name: "Air jordan",
                        },
                        {
                            id: 2,
                            name: "Puma"
                        }
                    ]
                },
                hats: {
                    id: 2,
                    title: "hats",
                    items: [
                        {
                            id: 3,
                            name: "Top hat"
                        }
                    ]
                }
            }
        }
    };


    let wrapper;

    beforeEach(() => {
        useSelector.mockImplementation(() => selectCollection("hats")(mockState));
        useParams.mockReturnValue("hats");

        wrapper = shallow(<CollectionPage />);
    });

    it("should render the CollectionPage component", () => {
        expect.assertions(1);

        expect(wrapper).toMatchSnapshot();
    });

    it("should render the same number of CollectionItems as there are items in the collection", () => {
        expect.assertions(2);

        expect(wrapper.find(CollectionItem).length).toEqual(mockState.shop.collections.hats.items.length);

        useSelector.mockClear();

        useSelector.mockImplementation(() => selectCollection("sneakers")(mockState));

        wrapper = shallow(<CollectionPage />);

        expect(wrapper.find(CollectionItem).length).toEqual(mockState.shop.collections.sneakers.items.length);
    });
});