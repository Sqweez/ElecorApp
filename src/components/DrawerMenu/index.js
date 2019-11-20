import React, {Component} from 'react';
import {View, StyleSheet, Dimensions, TouchableOpacity, Text, Platform, StatusBar, Image} from 'react-native';
import colors from "../../consts/colors";
import {Button, Icon} from "native-base";

const { width } = Dimensions.get('window');
class DrawerMenu extends Component {

    state = {
        messageCount: 2,
    };

    navLink = (link, text, isMain = false, icon = null) => {
        const menuIcon =
            isMain ?
            <Icon name={icon} style={{
                color: colors.GOLD,
                fontSize: 22,
                marginRight: 20,
                marginTop: 5,
            }}/> : null;

        const messageBadge = text === 'Сообщения'
            ?
            <View style={styles.badge}>
            <Text style={{
                color: colors.WHITE,
                textAlign: 'center',
                fontWeight: 'bold',
                lineHeight: 20,
                }}>{this.state.messageCount}</Text>
            </View>
            : null;

        return (
            <TouchableOpacity
                style={!isMain ? {...styles.secondaryLink} : {...styles.secondaryLink, ...styles.mainLink}}
                onPress={() => this.props.navigation.navigate(link)}>

                {menuIcon}

                <Text style={!isMain ? styles.secondaryLinkText : {...styles.secondaryLinkText, ...styles.mainLinkText}}>{text}</Text>

                {messageBadge}
            </TouchableOpacity>
        )
    };
    
    render() {
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
                    <Button transparent onPress={() => this.props.navigation.closeDrawer()} >
                        <TouchableOpacity onPress={() => this.props.navigation.closeDrawer()} >
                            <Icon name="close" style={{
                                color: colors.WHITE,
                                marginTop: 3,
                                }}/>
                        </TouchableOpacity>
                    </Button>
                </View>
                {this.navLink('Home', 'Вход/Регистрация', true, 'person')}
                {this.navLink('Home', 'Сообщения', true, 'chatboxes')}
                {this.navLink('Service', 'Все услуги')}
                {this.navLink('Home2', 'Обратная связь')}
                {this.navLink('Home2', 'Акции и предложения')}
                {this.navLink('Home2', 'Оплата онлайн')}
                {this.navLink('Home2', 'Контакты')}
            </View>
        );
    }

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

export default DrawerMenu;