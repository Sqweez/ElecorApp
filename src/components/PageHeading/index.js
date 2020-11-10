import React from 'react';
import {View, StyleSheet, Text, Dimensions, SafeAreaView} from 'react-native';
import PropTypes from 'prop-types';
import colors from "../../consts/colors";

const {width} = Dimensions.get('window');

function PageHeading(props) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{props.heading}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.BORDER,
        paddingVertical: 16,
        paddingLeft: 16,
        paddingRight: width * 0.25,
    },
    text: {
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        fontSize: 26,
        color: '#434343'
    }
});

PageHeading.propTypes = {
    heading: PropTypes.string.isRequired,
};

export default PageHeading;