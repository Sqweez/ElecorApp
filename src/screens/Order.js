import React, {useState, useEffect, useContext} from 'react';
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
import {observer} from "mobx-react-lite";
import {Picker} from 'native-base';
import SecondaryHeader from "../components/SecondaryHeader";
import PageHeading from "../components/PageHeading";
import colors from "../consts/colors";
import FlatButton from "../components/FlatButton";
import TextInputMask from "react-native-text-input-mask";
import services from "../store/services";
import User from "../store/User";
import storage_keys from "../consts/storage_keys";

const {width} = Dimensions.get('window');
import AsyncStorage from "@react-native-community/async-storage";
import {createOrder} from "../api/services";
import SimpleToast from "react-native-simple-toast";

function renderServiceList(services) {
    return services.map((s, index) => {
        return (
            <Picker.Item
                label={s.title}
                value={s.id}
                key={index}
                style={{
                    borderColor: colors.BORDER,
                    borderWidth: 2,
                }}/>
        )
    })
}


function Order(props) {

    const serviceStore = useContext(services);

    const userStore = useContext(User);

    const [name, setName] = useState('');

    const [phone, setPhone] = useState('');

    const [comment, setComment] = useState('');

    useEffect(() => {
        if (userStore.isLoggedIn) {
            setName(userStore.user.name);
            let phone = userStore.user.phone;
            phone = '+7' + phone.substr(1);
            setPhone(phone);
        }
    }, []);


    const [modalVisible, toggleModalVisible] = useState(false);
    const [service, setService] = useState(null);
    const [backgroundBlur, setBackgroundBlur] = useState(null);

    useEffect(() => {
        const service_id = props.navigation.getParam('service_id') || serviceStore.mainServices[0].id;
        setService(service_id);
    }, []);

    useEffect(() => {
        if (modalVisible) {
            setBackgroundBlur({backgroundColor: ''})
        } else {
            setBackgroundBlur(null)
        }
    }, [modalVisible]);

    const [bottomMargin, setMargin] = useState(20);

    const _sendOrder = async () => {
        console.log(1);
        const order = {
            client_id: userStore.user_id || null,
            client_name: name,
            service_id: service,
            client_comment: comment,
            phone: phone,
            push_token: await AsyncStorage.getItem(storage_keys.PUSH_TOKEN) || null,
        };
        
        console.log(order);

        if (!order.client_name || !order.phone && !order.service_id) {
            SimpleToast.show("Необходимо заполнить поля перед отправкой!");
            return ;
        }

        await createOrder(order);

        SimpleToast.show("Ваше заявка была создана! Менеджер компании свяжется с вами в ближайшее время!", 5000);

        props.navigation.navigate("Home");
    };

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
                    <TextInput style={styles.input} placeholder={'Имя'} value={name}
                               onChangeText={text => setName(text)}/>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>
                        Телефон:
                    </Text>
                    <TextInputMask
                        value={phone}
                        onChangeText={(text) => setPhone(text)}
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
                            selectedValue={service}
                            style={styles.input}
                            onValueChange={(value) => {
                                setService(value);
                            }}
                        >
                            {renderServiceList(serviceStore.mainServices)}
                        </Picker>
                    </View>
                </View>
                <View style={{...styles.inputContainer, flexDirection: 'column', alignItems: 'flex-start'}}>
                    <Text style={{...styles.label, marginBottom: 13}}>
                        Комментарий:
                    </Text>
                    <TextInput
                        value={comment}
                        onChangeText={(text) => setComment(text)}
                        multiline numberOfLines={4}
                        style={{...styles.input, ...styles.textArea}}/>
                </View>

            </ScrollView>
            <View style={{
                paddingVertical: 16,
                paddingHorizontal: 85,
            }}>
                <FlatButton primary text="Отправить" onPress={_sendOrder}/>
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

export default observer(Order);