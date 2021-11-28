import React from "react";
import { shallow } from "enzyme";

import HomePage from "./homepage.component";

describe("HomePage component:", () => {
    it("should render the HomePage component", () => {
        expect.assertions(1);

        expect(shallow(<HomePage />)).toMatchSnapshot();
    });
});