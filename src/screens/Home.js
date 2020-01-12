import {StatusBar, View} from 'react-native';
import React, {useEffect, useContext} from "react";
import HeaderBar from "../components/Header";
import HomeSlides from "../components/HomeSlides";
import {Container, Content, Header} from "native-base";
import Services from "../components/Services";
import HomeLink from "../components/HomeLink";
import FlatButton from "../components/FlatButton";
import AsyncStorage from "@react-native-community/async-storage";
import STORAGE_KEYS from "../consts/storage_keys";
import OneSignal from "react-native-onesignal";
import CONFIG from "../consts/config";
import User from "../store/User";
import colors from "../consts/colors";

function Home(props) {

    const userStore = useContext(User);

    useEffect(() => {
        userStore.resetStep();
    }, []);

    return (
        <>
            <Container>
                <HeaderBar appName={'Elecor'} navigation={props.navigation}/>
                <Content>
                    <View style={{flex: 1}}>
                        <HomeSlides {...props}/>
                        <Services {...props}/>
                        <HomeLink />
                    </View>
                    <View style={{marginVertical: 20, paddingHorizontal: 85}}>
                        <FlatButton
                            primary={true}
                            text={'подать заявку'}
                            onPress={() => props.navigation.navigate('Order', {
                                id: 1000,
                            })}/>
                    </View>
                </Content>
            </Container>
        </>
    );
}

export default Home;