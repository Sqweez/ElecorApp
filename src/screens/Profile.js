import React, {useContext, useState, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image, ScrollView, Dimensions} from 'react-native';
import SecondaryHeader from "../components/SecondaryHeader";
import colors from "../consts/colors";
import PageHeading from "../components/PageHeading";
import PageSubHeader from "../components/PageSubHeader";
import ServiceAccordion from "../components/ServiceAccordion";
import PaymentItem from "../components/PaymentItem";
import {observer} from "mobx-react-lite";
import User from "../store/User";
import Spinner from "react-native-spinkit";

const {width, height} = Dimensions.get('window');

const chatboxOutline = require('../assets/icons/chatbox-outline.png');

function renderServiceAccordion(services) {
    return services.map((service, key, services) => {
        const expanded = services.length === 1;
        return <ServiceAccordion
            title={service.service_name}
            data={
                {
                    personal_account: service.personal_account,
                    balance: service.balance,
                }
            }
            key={service.id}
            expanded={expanded}/>
    });
}

function renderPaymentItem(payments) {
    return payments.map((p) => {
        return (
            <PaymentItem
                key={p.id}
                data={p}
            />
        );
    })
}


const Profile = (props) => {


    const userStore = useContext(User);

    useEffect(() => {
        (async function getData() {
            await userStore.getClientData();
        }());
    }, []);

    return (

        <View style={{flex: 1}}>

            <SecondaryHeader text="Личный кабинет" style={styles.header}>
                <TouchableOpacity
                    onPress={() => props.navigation.navigate('Messages')}
                    style={styles.messageButton}>
                    {
                        userStore.unreadCount > 0 &&
                        <View style={styles.badge}>
                            <Text style={{
                                textAlign: 'center',
                                color: colors.WHITE,
                                lineHeight: 16
                            }}>
                                {userStore.unreadCount}
                            </Text>
                        </View>}
                    <Image source={chatboxOutline} style={styles.badgeIcon}/>
                </TouchableOpacity>
            </SecondaryHeader>
            <View>
                <Spinner
                    style={styles.spinner}
                    isVisible={!userStore.userLoaded}
                    color={colors.GOLD}
                    size={40}
                    type="Wave"
                />
            </View>
            {
                userStore.userLoaded &&
                <View>
                    <PageHeading heading={userStore.user.name}/>
                    <PageSubHeader title="Мои услуги"/>
                    {renderServiceAccordion(userStore.user.connections)}
                    <PageSubHeader title="История платежей"/>
                </View>
            }
            {
                userStore.userLoaded &&
                <ScrollView
                    style={{backgroundColor: colors.BORDER}}
                    contentContainerStyle={styles.paymentContainer}>
                    {renderPaymentItem(userStore.user.transactions)}
                </ScrollView>
            }
        </View>
    );
};

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
        borderRadius: 10,
    },
    container: {},
    spinner: {
        position: 'absolute',
        top: height / 2.7,
        left: width / 2.3,
    }
});

export default observer(Profile);