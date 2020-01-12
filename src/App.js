import React, {useEffect, useContext, useState} from 'react';
import {Image, View, Dimensions, StatusBar, ActivityIndicator} from 'react-native';
import {observer} from 'mobx-react-lite';
import AsyncStorage from '@react-native-community/async-storage';
import STORAGE_KEYS from "./consts/storage_keys";
import User from "./store/User";
import OneSignal from "react-native-onesignal";
import CONFIG from './consts/config';
import DrawerNavigator from "./navigation/DrawerNavigator";
import NavigationService from "./navigation/NavigationService";
import stocks from "./store/stocks";
import services from "./store/services";
import SimpleToast from "react-native-simple-toast";
import colors from "./consts/colors";
import Spinner from "react-native-spinkit";
import NetInfo from "@react-native-community/netinfo";

const {width, height} = Dimensions.get('window');

function App() {

    const userState = useContext(User);
    const stockStore = useContext(stocks);
    const serviceStore = useContext(services);


    const image = require('./assets/images/splashscreen.jpg');

    const [appLoaded, setAppLoaded] = useState(false);

    const [fromPush, setFromPush] = useState(false);


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
        const user_id = await AsyncStorage.getItem(STORAGE_KEYS.USER_ID);
        if (user_id) {
            if (appLoaded === true) {
                NavigationService.navigate("Messages")
            } else {
                setFromPush(true);
            }
        }
    };
    
    useEffect(() => {
        console.disableYellowBox = true;
        initOneSignal();
        (async function checkUserState() {
            await stockStore.getStocks();
            await serviceStore.getServices();
            const user_id = await AsyncStorage.getItem(STORAGE_KEYS.USER_ID);
            if (user_id) {
                await userState.setUserId(user_id);
                const status = await userState.getClientData();
                console.log(status);
                if (status === 500) {
                    SimpleToast.show(userState.error, 5000);
                    return;
                }
                if (status === 404) {
                    SimpleToast.show(userState.error, 5000);
                    await AsyncStorage.removeItem(STORAGE_KEYS.USER_ID);
                    await userState.setUserId(null);
                } else {
                    await userState.getMessages();
                }

                setAppLoaded(true);
                
                if (fromPush) {
                    NavigationService.navigate("Messages");
                }

            }
            else {
                setAppLoaded(true);
            }
        })();
    }, []);

    useEffect(() => {
        if (fromPush === true && appLoaded === true) {
            NavigationService.navigate("Messages");
        }
    }, [fromPush, appLoaded]);

    return (
        <>
            {!appLoaded &&
                <>
                    <StatusBar
                        barStyle="dark-content"
                        backgroundColor={'#c7c7c7'}/>
                    <View style={{
                        width: width,
                        height: height,
                        flex: 1
                    }}>
                        <Image
                            style={{
                                flex: 1,
                                resizeMode: 'cover',
                                width: null,
                                height: null
                            }}
                            source={image}/>
                        <ActivityIndicator animating size="large" color={colors.GOLD} style={{
                            position: 'absolute',
                            bottom: 90,
                            left: width / 2 - 20,
                        }}
                                           isVisible={!appLoaded}/>
                    </View>
                </>
            }
            {appLoaded &&  <DrawerNavigator
                ref={navigatorRef => {
                    NavigationService.setTopLevelNavigator(navigatorRef);
                }}/>}
        </>

    );
}


export default observer(App);