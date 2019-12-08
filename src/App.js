import React, {createContext, useEffect, useContext} from 'react';
import DrawerNavigator from "./navigation/DrawerNavigator";
import {observer} from 'mobx-react-lite';
import AsyncStorage from '@react-native-community/async-storage';
import STORAGE_KEYS from "./consts/storage_keys";
import User from "./store/User";
import OneSignal from "react-native-onesignal";
import CONFIG from './consts/config';

function App() {

    const userState = useContext(User);

    const initOneSignal = () => {
        OneSignal.init(CONFIG.ONE_SIGNAL_APP_ID, {kOSSettingsKeyAutoPrompt : true});
        OneSignal.addEventListener('ids', onIds);
        OneSignal.addEventListener('received', onReceive);
        OneSignal.addEventListener('opened', onOpen);
    };

    const onIds = (device) => {
        AsyncStorage.setItem(STORAGE_KEYS.PUSH_TOKEN, device.userId);
    };

    const onReceive = async () => {
        await userState.getMessages();
    };

    const onOpen = async () => {
        const messages = userState.messages;
        await userState.markAsRead(messages[0].id);
    };

    useEffect(() => {
        initOneSignal();
        (async function checkUserState() {
            const user_id = await AsyncStorage.getItem(STORAGE_KEYS.USER_ID);
            if (user_id) {
                await userState.setUserId(user_id);
                await userState.getMessages();
            }
        })();
    }, []);

    return (
        <DrawerNavigator/>
    );
}


export default observer(App);