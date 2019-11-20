import {View, Text} from 'react-native';
import React from "react";
import {Container, Content, Header} from "native-base";
import FlatButton from "../components/FlatButton";
import { DrawerActions } from "react-navigation";
import HeaderBar from "../components/Header";

function Home2(props) {
    return (
        <Container style={{flex: 1}}>
            <HeaderBar appName={'Elecor'} navigation={props.navigation}/>
            <Content>
                <View style={{marginVertical: 10, paddingHorizontal: 85}}>
                    <Text>{ props.navigation.getParam('id', null) }</Text>
                    <FlatButton
                        primary={true}
                        text={'подать заявку'}
                        onPress={() => props.navigation.goBack()}/>
                </View>
            </Content>
        </Container>
    );
}

export default Home2;