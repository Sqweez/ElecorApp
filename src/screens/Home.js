import {View, ScrollView} from 'react-native';
import React from "react";
import HeaderBar from "../components/Header";
import HomeSlides from "../components/HomeSlides";
import {Container, Content, Header} from "native-base";
import Services from "../components/Services";
import HomeLink from "../components/HomeLink";
import FlatButton from "../components/FlatButton";

function Home(props) {
    return (
        <Container>
            <HeaderBar appName={'Elecor'} navigation={props.navigation}/>
            <Content>
                <View style={{flex: 1}}>
                    <HomeSlides/>
                    <Services {...props}/>
                    <HomeLink/>
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
    );
}

export default Home;