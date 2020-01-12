import React, {useState, useContext} from 'react';
import {View} from 'react-native';
import HomeLinkItem from "./HomeLinkItem";
import {observer} from "mobx-react-lite";
import User from "../../store/User";
import stocks from "../../store/stocks";

function HomeLink() {

    const userStore = useContext(User);
    const stockStore = useContext(stocks);

    return (
        <View>
            <HomeLinkItem
                title="Акции и предложения"
                count={stockStore.stocksCount}
                image={require('../../assets/icons/stocks.png')}
                link={'Stocks'} />
            {
                userStore.isLoggedIn && userStore.hasConnections ?
                <HomeLinkItem
                    title="Оплата онлайн"
                    count={null}
                    image={require('../../assets/icons/cart.png')}
                    link={'Payment'} />
                    : !userStore.isLoggedIn ?
                    <HomeLinkItem
                        title="Оплата онлайн"
                        count={null}
                        image={require('../../assets/icons/cart.png')}
                        link={'Login'} /> : null
            }

        </View>
    );
}


export default observer(HomeLink);