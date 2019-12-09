import React, {useEffect, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import ServiceItem from "./service-item";
import {observer} from "mobx-react-lite";
import services from "../../store/services";

function Services(props) {

    const serviceStore = useContext(services);

    useEffect(() => {
        (async () => {
            await serviceStore.getServices();
        })();
    }, []);

    /*const _navigateToService = async id => {
        await serviceStore.setService(id);
        console.log('kemeke');
        props.navigation.navigate('Service');
    };*/

    const renderServices = () => {
        return serviceStore.mainServices.map((s, idx) => {
            return (
                <ServiceItem
                    /*onPress={() => _navigateToService(s.id)}*/
                    id={s.id}
                    title={s.title}
                    icon={s.icon}
                    key={idx}/>
            );
        });
    };

    return (
        <View style={styles.container}>
            {
                serviceStore.services.length > 0 &&
                renderServices()
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    }
});


export default observer(Services);