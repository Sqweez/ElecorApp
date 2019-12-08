import {StyleSheet, TouchableNativeFeedback, View, TouchableOpacity} from "react-native";
import {Button, Icon, Text, Header} from "native-base";
import React, {useContext} from "react";
import colors from "../../consts/colors";
import {withNavigation} from 'react-navigation';
import {observer} from "mobx-react-lite";
import User from "../../store/User";

const HeaderBar = observer((props) => {

    const userStore = useContext(User);

    const profileNavigation = () => {
        const isLogged = userStore.isLoggedIn;
        console.log(isLogged);
        if (isLogged) {
            props.navigation.navigate('Profile');
        } else {
            props.navigation.navigate('Login');
        }
    };

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
            <Button transparent style={styles.button_profile} onPress={() => profileNavigation()}>
                <TouchableOpacity onPress={() => profileNavigation()}>
                    <Icon name="person" style={styles.header_button}/>
                </TouchableOpacity>
            </Button>
        </View>
        </Header>
    );
});


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