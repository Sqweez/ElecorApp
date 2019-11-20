import Carousel from 'react-native-snap-carousel';
import React, {Component} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import SliderEntry from './SliderEntry_copy';
class SnapCarousel extends Component {
    _renderItemWithParallax({item, index}, parallaxProps) {
        return (
            <SliderEntry
                data={item}
                even={(index + 1) % 2 === 0}
                parallax={true}
                parallaxProps={parallaxProps}
            />
        );
    }
    render() {
        const {width: viewportWidth, height: viewportHeight} = Dimensions.get(
            'window',
        );
        function wp(percentage) {
            const value = (percentage * viewportWidth) / 100;
            return Math.round(value);
        }
        let ENTRIES1 = [
            {
                title: 'Beautiful and dramatic Antelope Canyon',
                subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
                illustration: 'https://i.ibb.co/rpL10bj/banner1.jpg',
            },
            {
                title: 'Earlier this morning, NYC',
                subtitle: 'Lorem ipsum dolor sit amet',
                illustration: 'https://i.ibb.co/9gVvS6C/banner2.jpg',
            },
            {
                title: 'White Pocket Sunset',
                subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
                illustration: 'https://i.imgur.com/MABUbpDl.jpg',
            },
            {
                title: 'Acrocorinth, Greece',
                subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
                illustration: 'https://i.imgur.com/KZsmUi2l.jpg',
            },
            {
                title: 'The lone tree, majestic landscape of New Zealand',
                subtitle: 'Lorem ipsum dolor sit amet',
                illustration: 'https://i.imgur.com/2nCt3Sbl.jpg',
            },
            {
                title: 'Middle Earth, Germany',
                subtitle: 'Lorem ipsum dolor sit amet',
                illustration: 'https://i.imgur.com/lceHsT6l.jpg',
            },
        ];

        const slideWidth = wp(75);
        const itemHorizontalMargin = wp(2);

        const sliderWidth = viewportWidth;
        const itemWidth = slideWidth + itemHorizontalMargin * 2;
        return (
            <View style={styles.exampleContainer}>
                <Carousel
                    ref={c => (this._slider1Ref = c)}
                    data={ENTRIES1}
                    renderItem={this._renderItemWithParallax}
                    sliderWidth={sliderWidth}
                    itemHeight={100}
                    sliderHeight={100}
                    itemWidth={itemWidth}
                    hasParallaxImages={true}
                    firstItem={1}
                    inactiveSlideScale={1}
                    inactiveSlideOpacity={0.7}
                    containerCustomStyle={styles.slider}
                    contentContainerCustomStyle={styles.sliderContentContainer}
                    loop={true}
                    loopClonesPerSide={10}
                    autoplay={true}
                    autoplayDelay={500}
                    autoplayInterval={3000}
                    onSnapToItem={index => this.setState({slider1ActiveSlide: index})}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    exampleContainer: {
        // paddingVertical: 10,
    },
    sliderContentContainer: {
        paddingVertical: 10,
    },
});

export default SnapCarousel;
