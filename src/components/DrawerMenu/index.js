import React, {Component, useContext} from 'react';
import {View, StyleSheet, Dimensions, TouchableOpacity, Text, Platform, StatusBar, Image} from 'react-native';
import colors from "../../consts/colors";
import {Button, Icon} from "native-base";
import {withNavigation} from 'react-navigation';
const {width} = Dimensions.get('window');
import MessageStoreContext from '../../store/messages';
import {observer} from "mobx-react";

const drawNavLink = (props, link, text, isMain = false, icon = null, count = null) => {
    const menuIcon =
        isMain ?
            <Icon name={icon} style={{
                color: colors.GOLD,
                fontSize: 22,
                marginRight: 20,
                marginTop: 5,
            }}/> : null;

    const messageBadge = (text === 'Сообщения' && count > 0)
        ?
        <View style={styles.badge}>
            <Text style={{
                color: colors.WHITE,
                textAlign: 'center',
                fontWeight: 'bold',
                lineHeight: 20,
            }}>{count}</Text>
        </View>
        : null;

    return (
        <TouchableOpacity
            style={!isMain ? {...styles.secondaryLink} : {...styles.secondaryLink, ...styles.mainLink}}
            onPress={() => props.navigation.navigate(link)}>

            {menuIcon}

            <Text
                style={!isMain ? styles.secondaryLinkText : {...styles.secondaryLinkText, ...styles.mainLinkText}}>{text}</Text>

            {messageBadge}
        </TouchableOpacity>
    )
};


function DrawerMenu(props) {

    const messageStore = useContext(MessageStoreContext);

    return (
        <View style={styles.container}>
            <View style={styles.menuHeader}>
                <Text style={{
                    color: colors.WHITE,
                    fontSize: 18,
                    fontWeight: 'bold'
                }}>
                    Меню
                </Text>
                <Button transparent onPress={() => props.navigation.closeDrawer()}>
                    <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
                        <Icon name="close" style={{
                            color: colors.WHITE,
                            marginTop: 3,
                        }}/>
                    </TouchableOpacity>
                </Button>
            </View>
            {drawNavLink(props, 'Home', 'Главная страница', true, 'home')}
            {drawNavLink(props, 'Login', 'Вход/Регистрация', true, 'person')}
            {drawNavLink(props, 'Messages', 'Сообщения', true, 'chatboxes', messageStore.messageCount)}
            {drawNavLink(props, 'Service', 'Все услуги')}
            {drawNavLink(props, 'Contacts', 'Контакты')}
            {drawNavLink(props, 'Stocks', 'Акции и предложения')}
            {drawNavLink(props, 'Payment', 'Оплата онлайн')}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        flex: 1,
        backgroundColor: colors.BLACK,
    },
    menuHeader: {
        flexDirection: 'row',
        paddingVertical: 16,
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 56,
        paddingHorizontal: 15
    },
    secondaryLink: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 56,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.DARKBLACK
    },
    secondaryLinkText: {
        color: colors.WHITE,
        fontSize: 14
    },
    mainLink: {
        backgroundColor: colors.DARKBLACK,
        height: 59,
    },
    mainLinkText: {
        fontWeight: 'bold'
    },
    badge: {
        backgroundColor: colors.GOLD,
        borderRadius: 50,
        width: 22,
        height: 22,
        marginLeft: width * 0.02,
    },
});

export default observer(withNavigation(DrawerMenu));