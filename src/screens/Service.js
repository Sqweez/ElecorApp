import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import SecondaryHeader from "../components/SecondaryHeader";
import PageHeading from "../components/PageHeading";
import colors from "../consts/colors";
import FlatButton from "../components/FlatButton";
import {Icon} from "native-base";


function renderAdditionalFields(fields) {
    return fields.map((f, index) => {
        return (
            <View style={styles.additionalField} key={index}>
                <Text style={styles.additionalTitle}>{f.title}</Text>
                <Text style={styles.additionalValue}>{f.value}</Text>
            </View>
        );
    })
}

function renderAdditionalServices(services) {
    let serviceList = services.map((s, index) => {
        return (<View style={styles.serviceContainer} key={index}>
            <Text style={styles.serviceName}>{s}</Text>
            <Icon style={styles.icon} type="FontAwesome" name={'chevron-right'}/>
        </View>)
    });

    return (
        <View>
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
            </View>
            {serviceList}
        </View>);

}

function Service(props) {

    let scroll;

    props.navigation.addListener('didBlur', payload => {
        if (scroll) {
            scroll.scrollTo({x: 0, y: 0});
        }
    });

    let serviceTitle = props.navigation.getParam('title') || "Услуга";

    let [description, setDescription] = useState(`Приложение для смартфона, позволяющее вызвать личную охрану в любое время. Количество вызовов в месяц не ограниченно, ложные вызовы штрафом не облагаются. Скорость прибытия группы быстрого реагирования до 4 минут. Причиной для использования тревожной кнопки может быть внештатная ситуация, например:\n• Вы стали жертвой преступления, нарушения общественного порядка;\n• Плохое самочувствие;\n• Нужно в безопасности добраться куда-то;\n• Возникли проблемы с охраной, персоналом какого-либо заведения;\n• ДТП, застряли/потерялись по дороге;`);

    let [additionalFields, setAdditional] = useState(
        [
            {
                title: 'Стоимость подключения',
                value: '3500 тг'
            },
            {
                title: 'Абонентская плата в месяц',
                value: '2000 тг/м'
            },
        ]
    );

    let [additionalServices, setAdditionalServices] = useState(
        [
            'Сопровождение охраной',
            'Автосопровождение',
            'Трезвый водитель',
            'Сопровождение финансовых операций',
            'Кратковременный пост охраны',
        ]
    );

    return (
        <View style={styles.container}>
            <SecondaryHeader {...props}/>
            <ScrollView contentContainerStyle={styles.wrapper} ref={c => {scroll = c}}>
                <View>
                    <PageHeading heading={serviceTitle}/>
                    <Text style={styles.description}>
                        {description}
                    </Text>
                    {renderAdditionalFields(additionalFields)}
                    {renderAdditionalServices(additionalServices)}
                </View>
                <View style={{
                    paddingVertical: 16,
                    paddingHorizontal: 85,
                    marginBottom: 120,
                }}>
                    <FlatButton primary text={'Подключить'} onPress={() => props.navigation.navigate("Order")}/>
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

export default Service;