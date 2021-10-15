import React from "react";
import { useSelector } from "react-redux";

import CollectionItem from "../../components/collection-item/collection-item.component";

import { selectCollection } from "../../redux/shop/shop.selectors";

import {
  CollectionPageContainer,
  CollectionPageTitle,
  ItemsContainer,
} from "./collection.styles";

const CollectionPage = ({ match }) => {
  const collection = useSelector((state) =>
    selectCollection(match.params.collectionId)(state)
  );
  const { title, items } = collection;

  return (
    <CollectionPageContainer>
      <CollectionPageTitle>{title}</CollectionPageTitle>
      <ItemsContainer>
        {items.map((item) => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </ItemsContainer>
    </CollectionPageContainer>
  );
};

export default CollectionPage;
