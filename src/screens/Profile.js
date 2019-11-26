import React, {useContext, useEffect, useState, useRef} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import SecondaryHeader from "../components/SecondaryHeader";
import {Icon, Button} from "native-base";
import colors from "../consts/colors";
import MessageStoreContext from "../store/messages";
import PageHeading from "../components/PageHeading";
import PageSubHeader from "../components/PageSubHeader";
import ServiceAccordion from "../components/ServiceAccordion";
import PaymentItem from "../components/PaymentItem";
import { NavigationContext } from 'react-navigation';

const chatboxOutline = require('../assets/icons/chatbox-outline.png');


const Profile = (props) => {

    let [messageCount, setMessageCount] = useState(0);
    const messageContext = useContext(MessageStoreContext);


    useEffect(() => {
        setMessageCount(messageContext.messageCount)
    });

    return (

        <View style={{flex: 1}}>

            <SecondaryHeader text="Личный кабинет" style={styles.header}>
                <TouchableOpacity
                    onPress={() => props.navigation.navigate('Messages')}
                    style={styles.messageButton}>
                    {
                        messageCount > 0 &&
                        <View style={styles.badge}>
                            <Text style={{
                                textAlign: 'center',
                                color: colors.WHITE,
                                lineHeight: 16
                            }}>
                                {messageCount}
                            </Text>
                        </View>}
                    <Image source={chatboxOutline} style={styles.badgeIcon}/>
                </TouchableOpacity>
            </SecondaryHeader>
            <View>
                <PageHeading heading="Катеринин Александр"/>
                <PageSubHeader title="Мои услуги"/>
                <ServiceAccordion title="Мобильная тревожная кнопка"/>
                <ServiceAccordion title="Трезвый водитель"/>
                <ServiceAccordion title="Охрана дома и квартиры"/>
                <PageSubHeader title="История платежей"/>
            </View>
            <ScrollView style={{backgroundColor: colors.BORDER}}>
                <View style={styles.paymentContainer}>
                    <PaymentItem positive/>
                    <PaymentItem/>
                    <PaymentItem/>
                    <PaymentItem positive/>
                    <PaymentItem positive/>
                    <PaymentItem/>
                    <PaymentItem/>
                    <PaymentItem positive/>
                    <PaymentItem/>
                    <PaymentItem/>
                    <PaymentItem positive/>
                    <PaymentItem/>
                    <PaymentItem/>
                    <PaymentItem/>
                    <PaymentItem positive/>
                    <PaymentItem positive/>
                    <PaymentItem/>
                </View>
            </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        position: 'relative',
    },
    messageButton: {
        fontSize: 10,
        textAlign: 'right',
        marginTop: 3,
        paddingRight: 16,
        width: 50,
        height: 22,
    },
    badge: {
        position: 'absolute',
        top: -10,
        left: -2.5,
        zIndex: 1,
        backgroundColor: colors.GOLD,
        borderRadius: 10,
        padding: 2,
        width: 20,
        height: 20,
    },
    badgeIcon: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'contain'
    },
    paymentContainer: {
        marginHorizontal: 16,
        marginBottom: 16,
        backgroundColor: colors.WHITE,
        borderRadius: 8,
    },
    container: {}
});

export default Profile;