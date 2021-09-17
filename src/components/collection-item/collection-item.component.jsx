import React from 'react';
import { connect } from 'react-redux';

import { addItem } from '../../redux/cart/cart.actions';

import {
    CollectionItemContainer,
    BackgroundImageContainer,
    AddButton,
    CollectionFooterContainer,
    NameSpan,
    PriceSpan
} from './collection-item.styles';

const CollectionItem = ({ item, addItem }) => {
    const { name, price, imageUrl} = item;
    return (
    <CollectionItemContainer>
        <BackgroundImageContainer className="image" imageUrl={imageUrl}/>
        <CollectionFooterContainer>
            <NameSpan>{name}</NameSpan>
            <PriceSpan>{price}</PriceSpan>
        </CollectionFooterContainer>
        <AddButton onClick={() => addItem(item)} inverted> Add to cart </AddButton>
    </CollectionItemContainer>
)};

const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(addItem(item))
})

export default connect(null, mapDispatchToProps)(CollectionItem);