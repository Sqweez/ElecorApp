import React, {useEffect, useContext} from 'react';
import {View, StyleSheet, Text, StatusBar} from 'react-native';
import OneSignal from "react-native-onesignal";
import CONFIG from "../consts/config";
import AsyncStorage from "@react-native-community/async-storage";
import STORAGE_KEYS from "../consts/storage_keys";
import User from "../store/User";
import {StackActions} from "react-navigation";
import colors from "../consts/colors";

function Init(props) {

    /*const userState = useContext(User);

    const initOneSignal = () => {
        OneSignal.init(CONFIG.ONE_SIGNAL_APP_ID, {kOSSettingsKeyAutoPrompt: true});
        OneSignal.inFocusDisplaying(2);
        OneSignal.addEventListener('ids', onIds);
        OneSignal.addEventListener('received', onReceive);
        OneSignal.addEventListener('opened', onOpen);
    };

    const onIds = (device) => {
        AsyncStorage.setItem(STORAGE_KEYS.PUSH_TOKEN, device.userId);
    };

    const onReceive = async () => {
        if (userState.isLoggedIn) {
            await userState.getMessages();
        }
    };

    const onOpen = async () => {
        if (userState.isLoggedIn) {
            props.navigation.navigate('Profile');
        }
    };

    useEffect(() => {
        initOneSignal();
        (async () => {
            const user_id = await AsyncStorage.getItem(STORAGE_KEYS.USER_ID);
            console.log(user_id);
            if (user_id) {
                await userState.setUserId(user_id);
                await userState.getMessages();
                await userState.getClientData();
            } else {
                props.navigation.navigate("Home");
            }
            const messageCount = userState.unreadCount;
            if (messageCount > 0) {
                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [
                        props.navigation.navigate("Home"),
                        props.navigation.navigate({routeName: 'Profile'})
                    ],
                    key: 0
                });
                props.navigation.dispatch(resetAction);
            } else {
                props.navigation.navigate('Home');
            }
        })();
    }, []);*/

    return (
        <StatusBar
            barStyle="dark-content"
            backgroundColor={colors.WHITE}/> )
}

const styles = StyleSheet.create({
    container: {}
});

export default Init;