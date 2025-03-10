import {View, Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import React from 'react';
import MyCarousel from "../Carousel/SnapCarousel";
const width = Dimensions.get('window').width;

function HomeSlides(props) {
    return (
        <View style={styles.container}>
            <MyCarousel {...props}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        backgroundColor: '#E6E6E6',
    },
});

export default HomeSlides;