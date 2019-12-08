import React, {useContext, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, ScrollView, Image, Text} from 'react-native';
import SecondaryHeader from "../components/SecondaryHeader";
import colors from "../consts/colors";
import {observer} from "mobx-react-lite";
import stocks from "../store/stocks";

/*function StockItem(props) {

    return (
        <View
            style={styles.stockContainer}>
            <TouchableOpacity style={styles.overlay} onPress={props.onPress}/>
            <Text style={styles.stockTitle}>Внимание, акция!</Text>
            <Image
                style={styles.imageStock}
                source={{uri: 'https://i.ibb.co/QXdYRMV/banner1.jpg'}}/>
        </View>
    );
}*/

function Stocks(props) {

    const stockStore = useContext(stocks);

    useEffect(() => {
        (async () => {
            if (!stockStore.stocksLoaded) {
                await stockStore.getStocks();
            }
        })();
    });

    const _onPress = async (id) => {
        await stockStore.setStock(id);
        props.navigation.push("StockInfo");
    };

    const renderStocks = () => {
      return stockStore.stocks.map(stock => {
          return (
              <View
                  key={stock.id}
                  style={styles.stockContainer}>
                  <TouchableOpacity
                      style={styles.overlay}
                      onPress={() => _onPress(stock.id)}/>
                  <Text style={styles.stockTitle}>{stock.title}</Text>
                  <Image
                      style={styles.imageStock}
                      source={{uri: stock.image}}/>
              </View>
          )
      });
    };

    return (
        <View style={{flex: 1}}>
            <SecondaryHeader text="Акции"/>
            <ScrollView
                style={{backgroundColor: colors.BORDER}}
            >
                {
                    stockStore.stocksLoaded && renderStocks()
                }
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    stockContainer: {
        padding: 16,
        width: '100%',
        borderRadius: 10,
        height: 220,
        position: 'relative',
        overflow: 'hidden'
    },
    overlay: {
        borderRadius: 10,
        margin: 16,
        position: 'absolute',
        zIndex: 1,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,.6)'
    },
    imageStock: {
        width: null, height: null, resizeMode: 'cover', flex: 1,
    },
    stockTitle: {
        color: colors.WHITE,
        position: 'absolute',
        marginTop: 16 + 18,
        marginLeft: 20 + 18,
        zIndex: 2,
        fontSize: 16,
        fontWeight: 'bold'
    }
});

export default observer(Stocks);