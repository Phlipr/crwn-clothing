import React from "react";
import { shallow } from "enzyme";

import FormInput from "./form-input.component";

describe("FormInput component:", () => {
    const mockHandleChange = jest.fn();
    let label, wrapper, value;

    it("should render the FormInput component", () => {
        expect.assertions(1);

        expect(shallow(<FormInput />)).toMatchSnapshot();
    });

    it("should call the handleChange method when the FormInputContainer changes", () => {
        expect.assertions(1);

        wrapper = shallow(<FormInput handleChange={mockHandleChange} />);
        wrapper.find("FormInputContainer").simulate("change");

        expect(mockHandleChange).toHaveBeenCalled();
    });

    it("should render the FormInputLabel if label is given and the label should be shrunk if value is not null", () => {
        expect.assertions(4);

        label = "email";
        value = "preynolds1406@gmail.com"

        wrapper = shallow(<FormInput label={label} value={value} />);

        expect(wrapper.exists("FormInputLabel")).toBe(true);
        expect(wrapper.find("FormInputLabel").text()).toEqual(label);
        expect(wrapper.find("FormInputLabel").html()).toContain("shrink");

        value = "";

        wrapper = shallow(<FormInput label={label} value={value} />);

        expect(wrapper.find("FormInputLabel").html()).not.toContain("shrink");
    });

    it("should not render the FormInputLabel if label is not given", () => {
        expect.assertions(1);

        label = "";

        wrapper = shallow(<FormInput label={label} />);

        expect(wrapper.exists("FormInputLabel")).toBe(false);
    });
});