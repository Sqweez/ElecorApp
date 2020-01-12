import React, {useContext, useState, useEffect, useCallback} from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    RefreshControl,
    Dimensions,
    FlatList,
    ActivityIndicator
} from 'react-native';
import SecondaryHeader from "../components/SecondaryHeader";
import colors from "../consts/colors";
import PageHeading from "../components/PageHeading";
import PageSubHeader from "../components/PageSubHeader";
import ServiceAccordion from "../components/ServiceAccordion";
import PaymentItem from "../components/PaymentItem";
import {observer} from "mobx-react-lite";
import User from "../store/User";
import Spinner from "react-native-spinkit";
import {ScrollView} from "react-navigation";

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

const Profile = (props) => {


    const userStore = useContext(User);

    const [refreshing, setRefreshing] = useState(false);

    const [isLoading, setLoading] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        userStore.resetStep();

        (async () => {
            await userStore.getClientData();
            await userStore.getMessages();
            setRefreshing(false);
        })();

    }, [refreshing]);

    useEffect(() => {
        (async function getData() {
            await userStore.getClientData();
        }());
    }, []);

    const _navHome = () => {
        props.navigation.goBack()
    };
    
    const loadMore = async () => {
        setLoading(true);
        await userStore.incrementStep();
        setLoading(false);
    };

    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        return layoutMeasurement.height + contentOffset.y
            >= contentSize.height - 50;
    };

    return (
        <View style={{
            flex: 1,
            backgroundColor: colors.BORDER
        }}>
            <SecondaryHeader
                onPress={() => _navHome()}
                text="Личный кабинет"
                style={styles.header}>
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
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
            }
            onScroll={async ({nativeEvent}) => {
                if (isCloseToBottom(nativeEvent) && userStore.hasUnloadedTransactions) {
                    await loadMore();
                }
            }}
            contentContainerStyle={{backgroundColor: colors.BORDER, width: '100%'}}>

            <View style={{flex: 1}}>
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
                <View>
                    <FlatList
                        style={{...styles.paymentContainer}}
                        data={userStore.transactions}
                        renderItem={({ item }) => <PaymentItem data={item} />}
                        keyExtractor={item => item.id.toString()} />
                </View>
            }
            {
                isLoading &&
                <ActivityIndicator animating size="large" color={colors.GOLD}/>}
        </ScrollView>
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
        marginTop: 5,
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