import React, {Component, useState} from 'react';
import {TouchableOpacity, StyleSheet, Dimensions, ImageBackground} from 'react-native';
import Carousel, {ParallaxImage} from "react-native-snap-carousel";
import colors from "../../consts/colors";
import {withNavigation} from 'react-navigation';
const width = Dimensions.get('window').width;

class MyCarousel extends Component{

    state = {
        entries: [
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
    };

    _onPress = () => {
      this.props.navigation.push("StockInfo");
    };

    _renderItem = ({item, index}) => {
        const imageUrl = typeof item.illustration !== "number" ? {uri: item.illustration} : item.illustration;
        return (
            <TouchableOpacity
                key={index}
                onPress={this._onPress}
                style={{flex: 1, alignItems: 'center'}}>
                <ImageBackground
                    imageStyle={{borderRadius: 10}}
                    source={imageUrl}
                    style={styles.image}/>
            </TouchableOpacity>

        );
    };

    render() {
        return (
            <Carousel
                data={this.state.entries}
                renderItem={this._renderItem}
                sliderWidth={width}
                itemWidth={width * 0.9}
                loop={true}
                autoplay={true}
                enableSnap={true}
                autoplayInterval={3000}
                loopClonesPerSide={10}
            />
        );
    }
}


function _renderItem({item, index}) {
    const imageUrl = typeof item.illustration !== "number" ? {uri: item.illustration} : item.illustration;
    return (
        <TouchableOpacity
            key={index}
            style={{flex: 1, alignItems: 'center'}}>
            <ImageBackground
                imageStyle={{borderRadius: 10}}
                source={imageUrl}
                style={styles.image}/>
        </TouchableOpacity>

    );
}

/*function MyCarousel(props) {

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

    return (
        <Carousel
            data={entries}
            renderItem={_renderItem}
            sliderWidth={width}
            itemWidth={width * 0.9}
            loop={true}
            autoplay={true}
            enableSnap={true}
            autoplayInterval={3000}
            loopClonesPerSide={10}
        />
    );

}

*/

const styles = StyleSheet.create({
    image: {
        width: width * 0.9,
        aspectRatio: 2,
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'transparent',
        resizeMode: 'contain',
    }
});

export default withNavigation(MyCarousel);