import React, {useContext, useState, useEffect} from 'react';
import {View, StyleSheet, Text, Dimensions, TextInput} from 'react-native';
import SecondaryHeader from "../components/SecondaryHeader";
import PageHeading from "../components/PageHeading";
import TextInputMask from "react-native-text-input-mask";
import colors from "../consts/colors"
import FlatButton from "../components/FlatButton";
import {observer} from 'mobx-react-lite';
import User from "../store/User";
import SimpleToast from "react-native-simple-toast";
import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import API from "../consts/api";
import STORAGE_KEYS from '../consts/storage_keys';
const {width} = Dimensions.get('window');
import { StackActions  } from 'react-navigation';
import {getWelcomeMessage} from "../api/client";

function Login(props) {

    const user = useContext(User);

    useEffect(() => {
        if (user.isLoggedIn) {
            props.navigation.navigate('Home');
        }
    }, []);

    const [phone, setPhone] = useState(null);
    const [userId, setId] = useState(null);
    const [code, setCode] = useState(null);
    const [userCode, setUserCode] = useState(null);

    const sendSMS = async () => {
        const _phone = phone.replace(/[\+\(\)\-]/g, '');
        const response = await axios.post(`${API.GET_SMS}`, {
            phone: _phone
        });
        console.log(response);
        const {data} = response;
        if (data.error) {
            SimpleToast.show(data.error, 5000);
            return null;
        }
        setPhone(_phone);
        SimpleToast.show('Пароль был отправлен в виде SMS на указанный вами номер', 5000);
        setCode(data.code);
        setId(data.client_id);
    };

    const checkCode = async () => {
        if (userCode === code.toString()) {
            const response = await axios.get(`${API.GET_CLIENT_INFO}/${userId}`);

            if (response.error) {
                SimpleToast.show('Произошла ошибка, попробуйте авторизоваться позднее');
                props.navigation.navigate("Home");
                return;
            }

            user.setUser(response.data);
            user.setUserId(response.data.id);
            AsyncStorage.setItem(STORAGE_KEYS.USER_ID, response.data.id.toString());
            SimpleToast.show("Вы были успешно авторизованы");
            await getWelcomeMessage(response.data.id);
            props.navigation.replace("Profile");
        }
        else {
            SimpleToast.show('Пароли не совпадают!');
        }
    };

    return (
        <View style={{flex: 1}}>
            <SecondaryHeader text="Авторизация"/>
            <PageHeading heading="Вход"/>
            <View style={{
                flex: 1,
                justifyContent: 'space-between'
            }}>
                <View>
                    {   !code &&
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Телефон:</Text>
                            <View style={styles.inputWrapper}>
                                <TextInputMask
                                    keyboardType="numeric"
                                    onChangeText={(e) => setPhone(e)}
                                    style={{
                                        fontSize: 16
                                    }}
                                    mask={"8-([000])-[000]-[00]-[00]"}/>
                            </View>
                        </View>
                    }
                    {   code  &&
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Пароль:</Text>
                            <View style={styles.inputWrapper}>
                                <TextInputMask
                                    mask={"[0000]"}
                                    onChangeText={(text) => setUserCode(text)}
                                    placeholder="Код из SMS"
                                    keyboardType="numeric"
                                    style={{
                                        fontSize: 16
                                    }}
                                />
                            </View>
                        </View>
                    }
                    <Text style={styles.textHelper}>
                        Если Вы являетесь клиентом ОА “Elecor” и не можете войти, обратитесь по телефонам: +8 7182 20 98
                        29
                        (офис) +8 775 204 67 94 (менеджер)
                    </Text>
                </View>
                <View style={styles.buttonContainer}>
                    <FlatButton
                        onPress={() => !code ? sendSMS() : checkCode()}
                        text={!code ? 'Получить код' : 'Войти'}
                        primary/>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    inputWrapper: {
        borderWidth: 1,
        borderColor: colors.GOLD,
        height: 40,
        width: width * 0.7,
    },
    inputLabel: {
        fontSize: 16,
        color: colors.DARKGREY
    },
    textHelper: {
        color: colors.DARKGREY,
        fontSize: 16,
        marginTop: 30,
        paddingHorizontal: 25
    },
    buttonContainer: {
        marginBottom: 18,
        paddingHorizontal: 85
    }
});

export default observer(Login);