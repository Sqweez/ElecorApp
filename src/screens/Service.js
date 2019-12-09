import React, {useState, useEffect, useContext} from 'react';
import {View, StyleSheet, Text, ScrollView, TouchableOpacity} from 'react-native';
import SecondaryHeader from "../components/SecondaryHeader";
import PageHeading from "../components/PageHeading";
import colors from "../consts/colors";
import FlatButton from "../components/FlatButton";
import {Icon} from "native-base";
import {observer} from "mobx-react-lite";
import HTML from "react-native-render-html";
import services from "../store/services";
let scroll;


function renderAdditionalFields(fields) {
    return fields.map((f, index) => {
        return (
            <View style={styles.additionalField} key={index}>
                <Text style={styles.additionalTitle}>{f.key}</Text>
                <Text style={styles.additionalValue}>{f.value}</Text>
            </View>
        );
    })
}

function navigateToService(props, title) {
    scroll.scrollTo({x: 0, y: 0});
    props.navigation.push("Service", {
        title
    });
}

function renderAdditionalServices(services, onPress) {
    let serviceList = services.map((s, index) => {
        return (
            <TouchableOpacity key={index} onPress={onPress}>
                <View style={styles.serviceContainer} >
                    <Text style={styles.serviceName}>{s.title}</Text>
                    <Icon style={styles.icon} type="FontAwesome" name={'chevron-right'}/>
                </View>
            </TouchableOpacity>)
    });

    return (
        <View>
            {
                services.length > 0 &&
                <View style={{
                marginTop: 16,
                backgroundColor: colors.BORDER,
                paddingVertical: 12,
                paddingHorizontal: 16,
            }}>
                <Text style={{
                    color: colors.DARKGREY,
                    fontSize: 15,
                }}>Дополнительные услуги
                </Text>
            </View> }
            {serviceList}
        </View>);

}

function Service(props) {

    const serviceStore = useContext(services);

    props.navigation.addListener('didBlur', payload => {
        if (scroll) {
            scroll.scrollTo({x: 0, y: 0});
        }
    });

    const _navigateToService = async (id) => {
        await serviceStore.setService(id);
        //await props.navigation.push('Service');
    };

    const renderAdditionalServices = () => {
        let serviceList = serviceStore.additionalServices.map((s, index) => {
            return (
                <TouchableOpacity key={index} onPress={() => _navigateToService(s.id)}>
                    <View style={styles.serviceContainer} >
                        <Text style={styles.serviceName}>{s.title}</Text>
                        <Icon style={styles.icon} type="FontAwesome" name={'chevron-right'}/>
                    </View>
                </TouchableOpacity>)
        });

        return (
            <View>
                {
                    serviceStore.additionalServices.length > 0 &&
                    <View style={{
                        marginTop: 16,
                        backgroundColor: colors.BORDER,
                        paddingVertical: 12,
                        paddingHorizontal: 16,
                    }}>
                        <Text style={{
                            color: colors.DARKGREY,
                            fontSize: 15,
                        }}>Дополнительные услуги
                        </Text>
                    </View> }
                {serviceList}
            </View>);
    }


    return (
        <View style={styles.container}>
            <SecondaryHeader {...props}/>
            <ScrollView contentContainerStyle={styles.wrapper} ref={c => {scroll = c}}>
                <View>
                    <PageHeading heading={serviceStore.service.title}/>
                    <View style={styles.description}>
                        <HTML html={serviceStore.service.description}/>
                    </View>
                    {renderAdditionalFields(serviceStore.service.additional_information)}
                    {renderAdditionalServices(serviceStore.additionalServices)}
                </View>
                <View style={{
                    paddingVertical: 16,
                    paddingHorizontal: 85,
                    marginBottom: 120,
                }}>
                    {
                        serviceStore.service.main_id === null &&
                        <FlatButton primary text={'Подключить'} onPress={() => props.navigation.navigate("Order", {
                            service_id: serviceStore.service.id
                        })}/>
                    }

                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {},
    description: {
        paddingHorizontal: 16,
        paddingVertical: 16,
        fontSize: 15,
        color: colors.TEXT,
        lineHeight: 20,
    },
    additionalField: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        justifyContent: 'space-between',
        paddingVertical: 13,
        alignItems: 'center',
    },
    additionalTitle: {
        fontSize: 15,
        color: colors.TEXT,
    },
    additionalValue: {
        fontSize: 15,
        color: colors.GOLD,
    },
    serviceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 13,
        paddingHorizontal: 16
    },
    icon: {
        color: colors.GOLD,
        fontSize: 16
    },
    serviceName: {
        color: colors.TEXT,
        fontSize: 15,
    },
    wrapper: {
        justifyContent: 'space-between',
    }
});

export default observer(Service);