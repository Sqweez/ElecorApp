import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Dimensions} from 'react-native';
import {Icon} from "native-base";
import colors from "../../consts/colors";
import Swipeable from 'react-native-swipeable';

const {width} = Dimensions.get('window');

function MessageItem(props) {


    const {title, date, body, read, id} = props.message;

    const {onPress} = props;

    const button = (
        <TouchableOpacity onPress={onPress}>
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
                          style={{...styles.iconRight, color: read ? colors.DARKGREY : colors.GOLD}}/>
                </View>
            </View>
        </TouchableOpacity>
    );

    const rightButtons = [
        <TouchableOpacity
            onPress={props.onSwipe}
            style={{
            backgroundColor: '#f44336',
            width: Dimensions.get('window').width / 5,
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Icon
                type={"Ionicons"}
                  name={'trash'}
                  style={{
                      color: colors.WHITE,
                      justifyContent: 'center',
                      alignItems: 'center',
                  }}/>
        </TouchableOpacity>,
    ];

    return (
        <Swipeable children={button} rightButtons={rightButtons} />
    );
}


const styles = StyleSheet.create({
    messageContainer: {
        borderBottomWidth: 1,
        borderBottomColor: colors.BORDER,
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