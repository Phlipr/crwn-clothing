import React from 'react';
import { useHistory, useRouteMatch } from "react-router";

import CollectionItem from "../collection-item/collection-item.component";

import {
  CollectionPreviewContainer,
  TitleHeader,
  PreviewContainer,
} from "./collection-preview.styles";

const CollectionPreview = ({ title, items, routeName }) => {
  const history = useHistory();
  const match = useRouteMatch();

  return (
    <CollectionPreviewContainer>
      <TitleHeader onClick={() => history.push(`${match.path}/${routeName}`)}>
        {title.toUpperCase()}
      </TitleHeader>
      <PreviewContainer>
        {items
          .filter((item, idx) => idx < 4)
          .map((item) => (
            <CollectionItem key={item.id} item={item} />
          ))}
      </PreviewContainer>
    </CollectionPreviewContainer>
  );
};

export default CollectionPreview;