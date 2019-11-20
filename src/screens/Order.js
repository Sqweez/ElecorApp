import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, ScrollView, TextInput, Dimensions, Picker, KeyboardAvoidingView, SafeAreaView} from 'react-native';
import SecondaryHeader from "../components/SecondaryHeader";
import PageHeading from "../components/PageHeading";
import colors from "../consts/colors";
import FlatButton from "../components/FlatButton";
import {Content} from "native-base";

const {width} = Dimensions.get('window');

function renderServiceList(services) {
    return services.map((s, index) => {
        return (
            <Picker.Item
                label={s.title}
                value={s.title}
                key={index}
                style={{
                    borderColor: colors.BORDER,
                    borderWidth: 2,
                }}/>
            )
    })
}


function Order(props) {
    let [currentService, setService] = useState(null);
    let [services, setServices] = useState([
        {
            title: 'Мобильная тревожная кнопка',
        },
        {
            title: 'Охрана для бизнеса',
        },
        {
            title: 'Охрана домов и квартир',
        },
        {
            title: 'Системы видеонаблюдения',
        },
        {
            title: 'Пост частной охраны',
        },
        {
            title: 'Противопожарная безопасность',
        },
    ]);
    let [bottomMargin, setMargin] = useState(20);

    useEffect(() => {}, [bottomMargin]);

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "margin" : null}>
            <SecondaryHeader {...props}/>
            <Content contentContainerStyle={styles.wrapper}>
                <View>
                <PageHeading heading="Подача заявки"/>
                <Text style={styles.description}>Пожалуйста, заполните необходимые поля и нажмите кнопку «Отправить
                    заявку», после чего наши
                    менеджеры обязательно свяжутся с Вами.</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>
                        Ваше имя:
                    </Text>
                    <TextInput style={styles.input} placeholder={'Имя'}/>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>
                        Телефон:
                    </Text>
                    <TextInput style={styles.input}/>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>
                        Услуга:
                    </Text>
                    <Picker
                        selectedValue={currentService}
                        style={styles.input}
                        onValueChange={(value) => {
                            setService(value);
                        }}
                        >
                        {renderServiceList(services)}
                    </Picker>
                </View>
                <View style={{...styles.inputContainer, flexDirection: 'column', alignItems: 'flex-start'}}>
                    <Text style={{...styles.label, marginBottom: 13}}>
                        Комментарий:
                    </Text>
                    <TextInput
                        multiline numberOfLines={4}
                        style={{...styles.input, width: '100%', height: 100, marginBottom: 20}}/>
                </View>
                </View>
                <View style={{
                    paddingVertical: 16,
                    paddingHorizontal: 85,
                }}>
                    <FlatButton primary text="Отправить"/>
                </View>
            </Content>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    description: {
        paddingHorizontal: 16,
        paddingVertical: 16,
        fontSize: 15,
        color: colors.TEXT,
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 6,
        paddingHorizontal: 16,
        alignItems: 'center'
    },
    label: {
        fontSize: 15,
        color: colors.DARKGREY,

    },
    input: {
        borderColor: colors.BORDER,
        borderWidth: 1,
        borderRadius: 2,
        width: width * 0.7,
        paddingVertical: 6,
        paddingLeft: 6,
        height: 30,
        color: colors.TEXT,
    },
    wrapper: {
        justifyContent: 'space-between',
        flex: 1,
    }
});

export default Order;