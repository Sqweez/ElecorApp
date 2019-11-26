import {StyleSheet, TouchableNativeFeedback, View, TouchableOpacity} from "react-native";
import {Button, Icon, Text, Header} from "native-base";
import React from "react";
import colors from "../../consts/colors";
import {withNavigation} from 'react-navigation';

function HeaderBar(props) {
    return (
        <Header transparent>
        <View style={styles.header}>
            <View style={{flex: 1, flexDirection: 'row'}}>
                <Button
                    transparent
                    style={styles.button_menu}
                    >
                    <TouchableOpacity
                        onPress={() => {
                            props.navigation.toggleDrawer();
                        }} >
                        <Icon name="menu" style={styles.header_button}/>
                    </TouchableOpacity>
                </Button>
                <Text style={styles.header_text}>
                    {props.appName || 'Элекор'}
                </Text>
            </View>
            <Button transparent style={styles.button_profile} onPress={() => props.navigation.push('Profile')}>
                <TouchableOpacity onPress={() => props.navigation.push('Profile')}>
                    <Icon name="person" style={styles.header_button}/>
                </TouchableOpacity>
            </Button>
        </View>
        </Header>
    );
}


const styles = StyleSheet.create({
    header: {
        paddingTop: 5,
        height: 60,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 5,
    },
    header_button: {
        color: colors.GOLD,
    },
    header_text: {
        fontSize: 18,
        lineHeight: 21,
        marginLeft: -5,
        fontWeight: 'bold',
        marginTop: 14,
    },
    button_menu: {
        marginLeft: -15,
    },
    button_profile: {
        marginRight: -15,
    }
});



export default withNavigation(HeaderBar);