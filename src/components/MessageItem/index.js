import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableNativeFeedback, Dimensions} from 'react-native';
import {Icon} from "native-base";
import colors from "../../consts/colors";
const {width} = Dimensions.get('window');
import PropTypes from 'prop-types';

function MessageItem(props) {


    const {title, date, text, isActive} = props.message;

    return(
        <Wrapper {...props}>
            <View style={styles.messageContainer}>
                <Text style={styles.messageTitle}>{title}</Text>
                <Text style={styles.messageDate}>{date}</Text>
                <Text numberOfLines={1} style={styles.messageText}>{text}</Text>
                <Icon type="FontAwesome"
                      name={'chevron-right'}
                      style={{...styles.iconRight, color: !isActive ? colors.DARKGREY : colors.GOLD}} />
            </View>
        </Wrapper>
    );
}

function Wrapper(props) {
    const {message, children, onPress} = props;
    const {isActive} = message;

    const component = isActive ? <TouchableNativeFeedback onPress={onPress}>{children}</TouchableNativeFeedback> : <View onPress={onPress} style={styles.inactiveView}>{children}</View>;

    return (
        <View>
            {component}
        </View>
    );

}

const styles = StyleSheet.create({
    messageContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 10,
    },
    messageTitle: {
        flexGrow: 3,
        fontSize: 20,
        fontWeight: 'bold',

    },
    messageDate: {
        fontSize: 14
    },
    messageText: {
        maxWidth: 0.75 * width,
    },
    iconRight: {
        fontSize: 18,
        color: colors.GOLD,
        textAlign: 'right',
        flexGrow: 1
    },
    inactiveView: {
        backgroundColor: colors.BORDER,
    }
});

export default MessageItem;