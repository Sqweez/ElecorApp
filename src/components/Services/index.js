import React from 'react';
import {View, StyleSheet} from 'react-native';
import ServiceItem from "./service-item";

function renderServices() {
    return serviceList.map((s, idx) => {
        return (
        <ServiceItem
            title={s.title}
            icon={s.icon}
            key={idx}/>
        );
    });
}

function Services() {
    return (
        <View style={styles.container}>
            {renderServices()}
        </View>
    );
}

const serviceList = [
    {
        title: 'Мобильная тревожная кнопка',
        icon: require('../../assets/icons/mtk.png')
    },
    {
        title: 'Охрана для бизнеса',
        icon: require('../../assets/icons/business.png')
    },
    {
        title: 'Охрана домов и квартир',
        icon: require('../../assets/icons/home.png')
    },
    {
        title: 'Системы видеонаблюдения',
        icon: require('../../assets/icons/camera.png')
    },
    {
        title: 'Пост частной охраны',
        icon: require('../../assets/icons/security.png')
    },
    {
        title: 'Противопожарная безопасность',
        icon: require('../../assets/icons/firewatch.png')
    },

];

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    }
});


export default Services;