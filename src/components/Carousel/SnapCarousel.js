import React, {Component, useState, useContext, useEffect} from 'react';
import {TouchableOpacity, StyleSheet, Dimensions, ImageBackground, View} from 'react-native';
import Carousel, {ParallaxImage} from "react-native-snap-carousel";
import {withNavigation} from 'react-navigation';
import {observer} from "mobx-react-lite";
import stocks from "../../store/stocks";

const width = Dimensions.get('window').width;

function MyCarousel(props) {

    const stockStore = useContext(stocks);

    const [banners, setBanners] = useState(null);


    useEffect(() => {
        (async () => {
            await stockStore.getStocks();
        })();
    }, []);

    const _onPress = async (id) => {
        await stockStore.setStock(id);
        props.navigation.push("StockInfo");
    };

    const _renderItem = ({item, index}) => {
        return (
            <TouchableOpacity
                onPress={() => _onPress(item.id)}
                key={index}
                style={{flex: 1, alignItems: 'center'}}>
                <ImageBackground
                    imageStyle={{borderRadius: 10}}
                    source={{uri: item.illustration}}
                    style={styles.image}/>
            </TouchableOpacity>

        );
    };

    const [entries, setEntries] = useState(
        [
            {
                title: 'Beautiful and dramatic Antelope Canyon',
                subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
                illustration: 'https://i.ibb.co/QXdYRMV/banner1.jpg',
            },
            {
                title: 'Earlier this morning, NYC',
                subtitle: 'Lorem ipsum dolor sit amet',
                illustration: 'https://i.ibb.co/rf7rs2Z/banner2.jpg',
            },
            {
                title: 'White Pocket Sunset',
                subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
                illustration: 'https://i.ibb.co/QXdYRMV/banner1.jpg',
            },
            {
                title: 'Acrocorinth, Greece',
                subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
                illustration: 'https://i.ibb.co/rf7rs2Z/banner2.jpg',
            },
            {
                title: 'The lone tree, majestic landscape of New Zealand',
                subtitle: 'Lorem ipsum dolor sit amet',
                illustration: 'https://i.ibb.co/QXdYRMV/banner1.jpg',
            },
            {
                title: 'Middle Earth, Germany',
                subtitle: 'Lorem ipsum dolor sit amet',
                illustration: 'https://i.ibb.co/rf7rs2Z/banner2.jpg',
            },
        ]
    );

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
                    /*loop={true}*/
                    /*loop={true}

                    */
                    autoplayInterval={3000}
                    /*loopClonesPerSide={10}*/
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