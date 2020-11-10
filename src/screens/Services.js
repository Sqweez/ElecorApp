import React, {useContext} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import {observer} from "mobx-react-lite";
import services from "../store/services";
import SecondaryHeader from "../components/SecondaryHeader";
import colors from "../consts/colors";
import {Icon} from "native-base";

function Services(props) {

    const serviceStore = useContext(services);

    const _onPress = async id => {
        await serviceStore.setService(id);
        await props.navigation.navigate('Service');
    };

    const renderServices = () => {
        return serviceStore.mainServices.map(service => {
            return (
                <View
                    key={service.id}
                    style={styles.stockContainer}>
                    <TouchableOpacity
                        style={styles.overlay}
                        onPress={() => _onPress(service.id)}/>
                    <Text style={styles.stockTitle}>{service.title}</Text>
                    <Image
                        style={styles.imageStock}
                        source={{uri: service.image}}/>
                    <Icon type="FontAwesome" name={'chevron-right'} style={styles.icon} />
                </View>
            )
        });
    };

    return (
        <View style={{flex: 1}}>
            <SecondaryHeader text="Услуги"/>
            <ScrollView
                style={{backgroundColor: colors.BORDER}}
            >
                {
                    serviceStore.mainServices.length > 0 && renderServices()
                }
            </ScrollView>
        </View>
    );

}

const styles = StyleSheet.create({
    stockContainer: {
        padding: 16,
        width: '100%',
        borderRadius: 10,
        height: 150,
        position: 'relative',
        overflow: 'hidden',
        marginBottom: -15
    },
    overlay: {
        borderRadius: 10,
        margin: 16,
        position: 'absolute',
        zIndex: 1,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,.6)'
    },
    imageStock: {
        width: null, height: null, resizeMode: 'cover', flex: 1, borderRadius: 10,
    },
    stockTitle: {
        color: colors.WHITE,
        position: 'absolute',
        marginTop: 16 + 18,
        marginLeft: 20 + 18,
        zIndex: 2,
        fontSize: 16,
        fontWeight: 'bold'
    },
    icon: {
        position: 'absolute',
        top: 60,
        right: 30,
        color: colors.GOLD,
        zIndex: 1,
    }
});

export default observer(Services);