import React, {Component, useState, useContext, useEffect} from 'react';
import {TouchableOpacity, StyleSheet, Dimensions, ImageBackground, View} from 'react-native';
import Carousel, {ParallaxImage} from "react-native-snap-carousel";
import {withNavigation} from 'react-navigation';
import {observer} from "mobx-react-lite";
import stocks from "../../store/stocks";
import services from "../../store/services";

const width = Dimensions.get('window').width;

function MyCarousel(props) {

    const stockStore = useContext(stocks);

    const serviceStore = useContext(services);

    useEffect(() => {
        (async () => {
            // await stockStore.getStocks();
        })();
    }, []);

    const _onPress = async (banner) => {
        let routeName = "";
        if (banner.service_id === null) {
            await stockStore.setStock(banner.id);
            routeName = "StockInfo";
        }
        else {
            await serviceStore.setService(banner.service_id);
            routeName = "Service";
        }
        props.navigation.navigate(routeName);
    };

    const _renderItem = ({item, index}) => {
        return (
            <TouchableOpacity
                onPress={() => _onPress(item)}
                key={index}
                style={{flex: 1, alignItems: 'center'}}>
                <ImageBackground
                    imageStyle={{borderRadius: 10}}
                    source={{uri: item.illustration}}
                    style={styles.image}/>
            </TouchableOpacity>

        );
    };

    return (<>
            {
                !stockStore.stocksLoaded &&
                    <View style={styles.preloader} />
            }
            {
                stockStore.stocksLoaded &&
                <Carousel
                    data={stockStore.banners}
                    renderItem={_renderItem}
                    sliderWidth={width}
                    itemWidth={width * 0.9}
                    autoplay={true}
                    enableSnap={true}
                    loop={true}
                    autoplayInterval={3000}
                />
            }
            </>
    );

}


const styles = StyleSheet.create({
    image: {
        width: width * 0.9,
        aspectRatio: 2,
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'transparent',
        resizeMode: 'contain',
    },
    preloader: {
        width: width * 0.9,
        aspectRatio: 2,
    }
});

export default observer(MyCarousel);