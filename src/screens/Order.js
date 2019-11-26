import React, {useState, useEffect} from 'react';
import {
    View,
    StyleSheet,
    Text,
    Modal,
    TextInput,
    ScrollView,
    Dimensions,
    KeyboardAvoidingView,
    TouchableOpacity
} from 'react-native';
import {Picker} from 'native-base';
import SecondaryHeader from "../components/SecondaryHeader";
import PageHeading from "../components/PageHeading";
import colors from "../consts/colors";
import FlatButton from "../components/FlatButton";
import TextInputMask from "react-native-text-input-mask";
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
    let [modalVisible, toggleModalVisible] = useState(false);
    let [currentService, setService] = useState(null);
    let [backgroundBlur, setBackgroundBlur] = useState(null);

    useEffect(() => {
        if (modalVisible) {
            setBackgroundBlur({backgroundColor: ''})
        } else {
            setBackgroundBlur(null)
        }
    }, [modalVisible]);

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

    useEffect(() => {
    }, [bottomMargin]);

    return (
        <KeyboardAvoidingView
            style={{...styles.container, ...backgroundBlur}}
            behavior={Platform.OS === "ios" ? "margin" : null}>
            <SecondaryHeader {...props}/>
            <ScrollView>
                <Modal
                    hardwareAccelerated={true}
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    style={{}}
                    onRequestClose={() => {
                        alert("Modal has been closed")
                    }}
                >
                    <View style={{
                        bottom: 0,
                        width: '100%',
                        borderRadius: 20,
                        position: 'absolute',
                        backgroundColor: colors.WHITE,
                        borderColor: '#e6e6e6',
                        borderWidth: 1,
                    }}>
                        <Text style={{fontSize: 40}}>Hello, World</Text>
                        <TouchableOpacity onPress={() => toggleModalVisible(!modalVisible)}>
                            <Text>Close modal!</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
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
                    <TextInputMask
                        style={styles.input}
                        mask={"+7 ([000]) [000] [00] [00]"}
                        keyboardType="numeric"
                        placeholder="+7 (777) 777 77 77"/>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>
                        Услуга:
                    </Text>
                    <View style={{height: 30, borderWidth: 1, borderColor: colors.BORDER, borderRadius: 7}}>
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
                </View>
                <View style={{...styles.inputContainer, flexDirection: 'column', alignItems: 'flex-start'}}>
                    <Text style={{...styles.label, marginBottom: 13}}>
                        Комментарий:
                    </Text>
                    <TextInput
                        multiline numberOfLines={4}
                        style={{...styles.input, ...styles.textArea}}/>
                </View>

            </ScrollView>
            <View style={{
                paddingVertical: 16,
                paddingHorizontal: 85,
            }}>
                <FlatButton primary text="Отправить" onPress={() => {}}/>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        zIndex: 1,
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
    },
    textArea: {
        width: '100%',
        height: 100,
        marginBottom: 20,
        textAlignVertical: 'top'
    }
});

export default Order;