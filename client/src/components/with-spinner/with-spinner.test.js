import React from "react";
import { shallow } from "enzyme";

import Spinner from "../spinner/spinner.component";
import WithSpinner from "./with-spinner.component";

describe("WithSpinner HOC", () => {
    const TestComponent = () => <div className="test"></div>;
    const WithSpinnerWrappedComponent = WithSpinner(TestComponent);

    let wrapper;

    describe("with isLoading set to true", () => {
        it("should render the Spinner component", () => {
            expect.assertions(1);

            wrapper = shallow(<WithSpinnerWrappedComponent isLoading={true} />);

            expect(wrapper.exists(Spinner)).toBe(true);
        });

        it("should not render the TestComponent", () => {
            expect.assertions(1);

            expect(wrapper.exists(TestComponent)).toBe(false);
        });
    });

    describe("with isLoading set to false", () => {
        it("should not render the Spinner component", () => {
            expect.assertions(1);

            wrapper = shallow(<WithSpinnerWrappedComponent isLoading={false} />);

            expect(wrapper.exists(Spinner)).toBe(false);
        });

        it("should render the TestComponent", () => {
            expect.assertions(1);

            expect(wrapper.exists(TestComponent)).toBe(true);
        });
    });
});