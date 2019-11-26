import React, {useState} from 'react';
import {View, StyleSheet, Text, ScrollView, TextInput, CheckBox} from 'react-native';
import SecondaryHeader from "../components/SecondaryHeader";
import PageHeading from "../components/PageHeading";
import colors from "../consts/colors";
import {Picker} from 'native-base';
import TextInputMask from "react-native-text-input-mask";
import FlatButton from "../components/FlatButton";

function renderServiceList(services) {
    return services.map((m, key) => {
        return (
            <Picker.Item
                label={m}
                value={m}
                key={key}
                style={{
                    borderColor: colors.BORDER,
                    borderWidth: 2,
                }}/>
        )
    });
}

function Payment() {

    const [services, setServices] = useState(
        ['Мобильная тревожная кнопка', 'Охрана домов и квартир']);

    const [chosenService, setChosenService] = useState(null);

    const [agree, toggleAgree] = useState(false);

    return (
        <View style={{flex: 1}}>
            <SecondaryHeader/>
            <ScrollView>
                <PageHeading heading="Оплата онлайн"/>
                <View style={styles.container}>
                    <Text style={styles.text}>
                        Перед оплатой, убедитесь, что на вашей карте открыт доступ для платежей в интернете.
                    </Text>
                    <Text style={styles.text}>
                        <Text style={{color: colors.GOLD, fontWeight: 'bold'}}>* </Text>
                        Оплата за услуги монтажа <Text style={{fontWeight: 'bold'}}>не принимается</Text> в данном
                        разделе!
                    </Text>
                    <View style={{...styles.justifyBetween}}>
                        <Text style={styles.label}>Услуга:</Text>
                        <View
                            style={{flex: 2, borderWidth: 1, borderColor: colors.BORDER, height: 40, borderRadius: 7}}>
                            <Picker
                                mode="dropdown"
                                selectedValue={chosenService}
                                style={{flex: 1}}
                                onValueChange={(value) => {
                                    setChosenService(value);
                                }}
                            >
                                {renderServiceList(services)}
                            </Picker>
                        </View>
                    </View>
                    <View style={{...styles.justifyBetween}}>
                        <Text style={styles.label}>Ваше имя:</Text>
                        <View
                            style={{flex: 2, borderWidth: 1, borderColor: colors.BORDER, height: 40, borderRadius: 7}}>
                            <TextInput placeholder="Ваше имя"/>
                        </View>
                    </View>
                    <View style={{...styles.justifyBetween}}>
                        <Text style={styles.label}>Cчёт:</Text>
                        <View
                            style={{flex: 2, borderWidth: 1, borderColor: colors.BORDER, height: 40, borderRadius: 7}}>
                            <Picker
                                mode="dropdown"
                                selectedValue={chosenService}
                                style={{flex: 1}}
                                onValueChange={(value) => {
                                    setChosenService(value);
                                }}
                            >
                                {renderServiceList(services)}
                            </Picker>
                        </View>
                    </View>
                    <View style={{...styles.justifyBetween}}>
                        <Text style={styles.label}>Cумма:</Text>
                        <View
                            style={{flex: 2, borderWidth: 1, borderColor: colors.BORDER, height: 40, borderRadius: 7}}>
                            <TextInputMask
                                keyboardType="numeric"
                                placeholder="Сумма"/>
                        </View>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        paddingHorizontal: 30
                    }}>
                        <View>
                            <CheckBox
                                value={agree}
                                onValueChange={(e) => {
                                    toggleAgree(!agree)
                                }}
                                tintColors={{
                                    true: colors.GOLD,
                                    false: colors.GOLD,
                                }}
                            />
                        </View>
                        <Text style={{
                            marginLeft: 16,
                            fontSize: 16,
                            color: colors.TEXT,
                        }}>
                            Я ознакомлен со всеми документами, изложенными выше, и согласен с условиями обслуживания
                        </Text>
                    </View>
                    <View style={{
                        paddingHorizontal: 85,
                        marginTop: 20,
                    }}>
                        <FlatButton primary text="Оплатить"/>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingVertical: 16,
    },
    text: {
        fontSize: 16,
        marginBottom: 12,
        color: colors.TEXT,
    },
    justifyBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        paddingHorizontal: 16
    },
    label: {
        flex: 1,
        color: colors.DARKGREY,
        fontSize: 16,
    }
});

export default Payment;