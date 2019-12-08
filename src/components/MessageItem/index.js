import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableNativeFeedback, Dimensions} from 'react-native';
import {Icon} from "native-base";
import colors from "../../consts/colors";
const {width} = Dimensions.get('window');

function MessageItem(props) {


    const {title, date, body, read} = props.message;

    const {onPress} = props;

    return(
        <TouchableNativeFeedback onPress={onPress}>
            <View style={{...styles.messageContainer, backgroundColor: read ? colors.BORDER : colors.WHITE}}>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    <Text style={styles.messageTitle}>{title}</Text>
                    <Text style={styles.messageDate}>{date}</Text>
                </View>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    <Text numberOfLines={1} style={styles.messageText}>{body}</Text>
                    <Icon type="FontAwesome"
                          name={'chevron-right'}
                          style={{...styles.iconRight, color: read ? colors.DARKGREY : colors.GOLD}} />
                </View>
            </View>
        </TouchableNativeFeedback>
    );
}

function Wrapper(props) {
    const {message, children, onPress} = props;
    const {isActive} = message;

    const component =
        isActive ? <TouchableNativeFeedback onPress={onPress}>{children}</TouchableNativeFeedback>
            :
        <TouchableNativeFeedback onPress={onPress} style={styles.inactiveView}>{children}</TouchableNativeFeedback>;

    return (
        <View>
            {component}
        </View>
    );

}

const styles = StyleSheet.create({
    messageContainer: {
        //flexDirection: 'row',
        //flexWrap: 'wrap',
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 10,
    },
    messageTitle: {
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