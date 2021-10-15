import React from 'react';
import { useDispatch } from "react-redux";

import { addItem } from "../../redux/cart/cart.actions";

import {
  CollectionItemContainer,
  BackgroundImageContainer,
  AddButton,
  CollectionFooterContainer,
  NameSpan,
  PriceSpan,
} from "./collection-item.styles";

const CollectionItem = ({ item }) => {
  const { name, price, imageUrl } = item;
  const dispatch = useDispatch();

  return (
    <CollectionItemContainer>
      <BackgroundImageContainer className="image" imageUrl={imageUrl} />
      <CollectionFooterContainer>
        <NameSpan>{name}</NameSpan>
        <PriceSpan>{price}</PriceSpan>
      </CollectionFooterContainer>
      <AddButton onClick={() => dispatch(addItem(item))} inverted>
        {" "}
        Add to cart{" "}
      </AddButton>
    </CollectionItemContainer>
  );
};

export default CollectionItem;