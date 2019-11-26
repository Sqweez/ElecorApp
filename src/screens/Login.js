import React from 'react';
import {View, StyleSheet, Text, ScrollView, Dimensions, TextInput} from 'react-native';
import SecondaryHeader from "../components/SecondaryHeader";
import PageHeading from "../components/PageHeading";
import TextInputMask from "react-native-text-input-mask";
import colors from "../consts/colors"
import {color} from "react-native-reanimated";
import FlatButton from "../components/FlatButton";

const {width} = Dimensions.get('window');

function Login() {
    return (
        <View style={{flex: 1}}>
            <SecondaryHeader text="Авторизация"/>
            <PageHeading heading="Вход"/>
            <View style={{
                flex: 1,
                justifyContent: 'space-between'
            }}>
                <View >
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Телефон:</Text>
                        <View style={styles.inputWrapper}>
                            <TextInputMask
                                style={{
                                    fontSize: 16
                                }}
                                mask={"+7 [000] [000] [00] [00]"}/>
                        </View>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Пароль:</Text>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                placeholder="Пароль"
                                secureTextEntry
                                style={{
                                    fontSize: 16
                                }}
                            />
                        </View>
                    </View>
                    <Text style={styles.textHelper}>
                        Если Вы являетесь клиентом ОА “Elecor” и не можете войти, обратитесь по телефонам: +8 7182 20 98 29
                        (офис) +8 775 204 67 94 (менеджер)
                    </Text>
                </View>
                <View style={styles.buttonContainer}>
                    <FlatButton text="Войти" primary/>
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

export default Login;