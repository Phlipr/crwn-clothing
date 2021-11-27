import React from "react";
import { shallow } from "enzyme";

import Directory from "./directory.component";
import { useSelector } from "react-redux";
import { HashRouter } from "react-router-dom";

const mockState = {
    directory: {
        sections: [
            {
                title: "hats",
                id: 1
            },
            {
                title: "sneakers",
                id: 2
            },
            {
                title: "jackets",
                id: 3
            }
        ]
    }
}

jest.mock("react-redux", () => ({
    useSelector: jest.fn()
}));

describe("Directory component:", () => {
    it("should render the Directory component", () => {
        useSelector.mockImplementation(selector => selector(mockState));
        expect.assertions(1);
        expect(shallow(<Directory />)).toMatchSnapshot();
    });
});