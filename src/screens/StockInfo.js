import React, {useContext, useEffect} from 'react';
import {View, StyleSheet, Dimensions, ScrollView, Image, Text} from 'react-native';
import SecondaryHeader from "../components/SecondaryHeader";
import PageHeading from "../components/PageHeading";
import colors from "../consts/colors";
import {observer} from 'mobx-react-lite';
import stocks from "../store/stocks";
const width = Dimensions.get('window').width;
import { WebView } from 'react-native-webview';
import HTML from 'react-native-render-html';
import AsyncStorage from '@react-native-community/async-storage';
import STORAGE_KEYS from "../consts/storage_keys";

function StockInfo(props) {

    const stockStore = useContext(stocks);

    const {title, body, image, id} = stockStore.stock;

    async function setItems() {
        let stocks = await AsyncStorage.getItem(STORAGE_KEYS.STOCKS);
        if (stocks === null) {
            stocks = [];
        } else {
            stocks = JSON.parse(stocks);
        }
        stocks.push(stockStore.stock.id);
        await AsyncStorage.setItem(STORAGE_KEYS.STOCKS, JSON.stringify(stocks));
        await stockStore.setReadStocks();
    }

    useEffect(() => {
       setItems();
    }, id);

    return (
        <View style={{flex: 1}}>
            <SecondaryHeader text="Назад"/>
            <ScrollView>
                <PageHeading heading={title}/>
                <View style={{
                    alignItems: 'center'
                }}>
                    <Image
                        style={styles.image}
                        source={{uri: image}}
                    />
                </View>
                <View style={{
                    paddingHorizontal: 20,
                }}>
                    <HTML html={body} allowedStyles={styles.text}/>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {},
    image: {
        marginVertical: 16,
        width: width * 0.7,
        paddingHorizontal: 50,
        aspectRatio: 2,
    },
    text: {
        paddingHorizontal: 20,
        fontSize: 16,
        color: colors.TEXT,
        lineHeight: 22,
    }
});

export default observer(StockInfo);