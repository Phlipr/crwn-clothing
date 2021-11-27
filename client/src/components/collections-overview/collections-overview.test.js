import React from "react";
import { shallow } from "enzyme";

import CollectionsOverview from "./collections-overview.component";
import Spinner from "../spinner/spinner.component";

import CollectionPreview from "../collection-preview/collection-preview.component";
import { useSelector } from "react-redux";

const mockStore = {
    shop: {
        collections: {
            hats: {
                items: {
                    name: "Top hat",
                    price: 25,
                    quantity: 1
                },
                id: 1
            },
            sneakers: {
                items: {
                    name: "Air Jordan",
                    price: 250,
                    quantity: 1
                },
                id: 2
            },
            jackets: {
                items: {
                    name: "Trenchcoat",
                    price: 255,
                    quantity: 1
                },
                id: 3
            }
        },
        isFetching: true
    }
};

const mockStoreWithEmptyCollection = {
    shop: {
        collections: {

        }
    }
};

jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useSelector: jest.fn()
}));

describe("CollectionsOverview:", () => {
    let wrapper;

    it("should render the CollectionsOverview component", () => {
        expect.assertions(1);
        useSelector.mockImplementation(selector => selector(mockStore));
        wrapper = shallow(<CollectionsOverview />);
        expect(wrapper).toMatchSnapshot();
    });

    it("should render the same number of CollectionPreview components as collections in the store", () => {
        expect.assertions(1);
        expect(wrapper.find(CollectionPreview).length).toEqual(Object.keys(mockStore.shop.collections).length);
    });

    it("should not render any CollectionPreview components if collection is empty", () => {
        expect.assertions(1);
        useSelector.mockImplementation(selector => selector(mockStoreWithEmptyCollection));
        wrapper = shallow(<CollectionsOverview />);
        expect(wrapper.exists(CollectionPreview)).toBe(false);
    });
});