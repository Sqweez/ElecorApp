import React from 'react';
import {View} from 'react-native';
import HomeLinkItem from "./HomeLinkItem";

const links = [
    {
        name: 'Акции и предложения',
        count: 1,
        image: require('../../assets/icons/stocks.png')
    },
    {
        name: 'Оплата онлайн',
        count: null,
        image: require('../../assets/icons/cart.png')
    },
];

function renderServices() {
    return links.map((s, idx) => {
        return <HomeLinkItem
            title={s.name}
            count={s.count}
            image={s.image}
            key={idx}/>
    });
}

function HomeLink() {
    return (
        <View>
            {renderServices()}
        </View>
    );
}


export default HomeLink;