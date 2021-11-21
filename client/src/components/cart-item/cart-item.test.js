import React from "react";
import { shallow } from "enzyme";

import CartItem from "./cart-item.component";

describe("CartItem component:", () => {
    const mockProps = {
        item: {
            imageUrl: "https://www.google.com",
            name: "Phillip",
            quantity: 2,
            price: 2.50
        }
    };

    let wrapper;

    it("should render the CartItem component", () => {
        wrapper = shallow(<CartItem item={mockProps} />);

        expect(wrapper).toMatchSnapshot();
    });
});