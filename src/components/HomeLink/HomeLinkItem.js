import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image, Text, Dimensions} from 'react-native';
import { Icon } from "native-base";
import colors from "../../consts/colors";
import {withNavigation} from 'react-navigation';
const width = Dimensions.get('window').width;

function HomeLinkItem(props) {

    let badge = props.count ?
        <View style={styles.badge}>
            <Text style={styles.badgeText}>+{props.count}</Text>
        </View> : null;

    return(
        <TouchableOpacity onPress={() => props.navigation.push(props.link)}>
            <View style={styles.container}>
                <View style={styles.linkWrapper}>
                    <Image
                        source={props.image}
                        style={styles.image}
                    />

                    <Text style={styles.text}>{props.title}</Text>

                    { badge }
                </View>
                <Icon type="FontAwesome" name={'chevron-right'} style={styles.icon} />
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 0.5,
        borderColor: colors.BORDER,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: width * 0.055,
        paddingRight: 33
    },
    linkWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        color: colors.GOLD,
        fontSize: 15
    },
    image: {
        marginRight: width * 0.055,
        width: 22,
        height: 22,
        resizeMode: 'contain'
    },
    text: {
        fontSize: 16
    },
    badge: {
        backgroundColor: colors.GOLD,
        borderRadius: 50,
        width: 25,
        height: 25,
        marginLeft: width * 0.02,
    },
    badgeText: {
        color: colors.WHITE,
        textAlign: 'center',
        lineHeight: 24,
    }
});

export default withNavigation(HomeLinkItem);