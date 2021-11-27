import React from "react";
import { shallow } from "enzyme";

import CustomButton from "./custom-button.component";

describe("CustomButton:", () => {
    it("should render the CustomButton component", () => {
        expect.assertions(1);
        expect(shallow(<CustomButton />)).toMatchSnapshot();
    });
});