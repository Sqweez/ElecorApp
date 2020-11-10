import React, {useState, useContext, useEffect} from 'react';
import {View, StyleSheet, Text, ScrollView, TextInput, Dimensions, KeyboardAvoidingView} from 'react-native';
import SecondaryHeader from "../components/SecondaryHeader";
import PageHeading from "../components/PageHeading";
import colors from "../consts/colors";
import {Picker, CheckBox} from 'native-base';
import TextInputMask from "react-native-text-input-mask";
import FlatButton from "../components/FlatButton";
import User from "../store/User";
import {observer} from 'mobx-react-lite'
import SimpleToast from "react-native-simple-toast";
import {makePay} from "../api/client";
import {WebView} from "react-native-webview";
const { width, height } = Dimensions.get('window');
import AutoHeightWebView from "react-native-autoheight-webview";
function formatAccount(_account) {
    let arr = _account.replace(/(\d{2})/g, '$1,').split(',');
    return arr.join(' ');
}

function Payment() {

    const userStore = useContext(User);

    const connections = userStore.connections;

    const [chosenService, setChosenService] = useState(userStore.connectedServices[0].service_name || '');

    const [accounts, setAccounts] = useState(userStore.connectedServices[0].accounts || []);

    const [chosenAccount, setAccount] = useState(userStore.connectedServices[0].accounts[0] || '');

    const [agree, toggleAgree] = useState(false);

    const [name, setName] = useState(userStore.user.name);

    const [price, setPrice] = useState(userStore.connectedServices[0].balance);

    const [paymentUrl, setPaymentUrl] = useState('');

    const renderServiceList = () => {
        return userStore.uniqueServices.map((m, key) => {
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
    };

    const renderAccountList = () => {
        return accounts.map((m, key) => {
            return (
                <Picker.Item
                    label={formatAccount(m)}
                    value={m}
                    key={key}
                    style={{
                        borderColor: colors.BORDER,
                        borderWidth: 2,
                    }}/>
            )
        });
    };

    const _onServiceChange = value => {
        setChosenService(value);
        const index = userStore.connectedServices.findIndex(s => s.service_name === value);
        const _accounts = userStore.connectedServices[index].accounts;
        setAccounts(_accounts);
        setAccount(_accounts[0])
    };

    useEffect(() => {
        const index = connections.findIndex(c => c.personal_account === chosenAccount);
        const balance = connections[index].balance;
        setPrice(balance < 0 ? (balance * -1).toString()  : '0');
    }, [chosenAccount]);

    const _onPress = async () => {
        if (!name) {
            SimpleToast.show('Введите имя, чтобы продолжить');
            return;
        }

        if (!agree) {
            SimpleToast.show('Вы должны ознакомиться с вышеизложенными условиями, чтобы продолжить');
            return;
        }

        if (price === 0) {
            SimpleToast.show('Введите сумму, чтобы продолжить');
            return;
        }

        const paymentData = {
            price: price,
            name: name,
            personal_id: chosenAccount,
            service: chosenService,
        };

        const response = await makePay(paymentData);

        setPaymentUrl(response);
        
    };
    
    return (
        <KeyboardAvoidingView style={{flex: 1}} behavior={'padding'}>
            <SecondaryHeader/>
            <ScrollView>
                {
                    paymentUrl.length === 0 &&
                    <>
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
                            <View style={{flex: 2}}>
                                <Picker
                                    iosHeader="Выберите услугу"
                                    mode="dropdown"
                                    headerBackButtonText="Назад"

                                    selectedValue={chosenService}
                                    style={{borderWidth: 1, borderColor: colors.BORDER, alignContent: 'center'}}
                                    onValueChange={(value) => _onServiceChange(value)}
                                >
                                    {renderServiceList()}
                                </Picker>
                                </View>
                        </View>


                        <View style={{...styles.justifyBetween}}>
                            <Text
                                onChangeText={(text) => setName(text)}
                                value={name}
                                style={styles.label}
                            >Ваше имя:</Text>
                            <View
                                style={{flex: 2, borderWidth: 1, borderColor: colors.BORDER, height: 40, borderRadius: 7, justifyContent: 'center', padd
                                : 10}}>
                                <TextInput
                                    style={{
                                        fontSize: 16,
                                        marginLeft: 16
                                    }}
                                
                                    value={userStore.user.name}
                                    selection={{start: 0, end: 0}}
                                    placeholder="Ваше имя"/>
                            </View>
                        </View>
                        <View style={{...styles.justifyBetween}}>
                            <Text style={styles.label}>Лицевой счет:</Text>
                                <View style={{flex: 2}}>
                                <Picker
                                    mode="dropdown"
                                    iosHeader="Выберите лиц. счет"
                                    headerBackButtonText="Назад"
                                    selectedValue={chosenAccount}
                                    style={{width: '100%', borderWidth: 1, borderColor: colors.BORDER, alignContent: 'center'}}
                                    onValueChange={(value) => setAccount(value)}
                                >
                                    {renderAccountList()}
                                </Picker>
                                </View>
                        </View>
                        <View style={{...styles.justifyBetween}}>
                            <Text style={styles.label}>Cумма:</Text>
                            <View
                                style={{flex: 2, borderWidth: 1, borderColor: colors.BORDER, height: 40, borderRadius: 7, justifyContent: 'center'}}>
                                <TextInput
                                    style={{
                                        fontSize: 16,
                                        marginLeft: 16
                                    }}
                                    defaultValue={price}
                                    onChangeText={(e) => setPrice(e)}
                                    keyboardType={'numeric'}
                                    placeholder="Сумма"/>
                            </View>
                        </View>

                        <View style={{
                            flexDirection: 'row',
                            paddingHorizontal: 30
                        }}>
                           
                                <CheckBox
                                    checked={agree}
                                    onValueChange={(e) => {
                                        toggleAgree(!agree)
                                    }}
                                    onPress={(e) => {
                                        toggleAgree(!agree)
                                    }}
                                    color={colors.GOLD}
                                    tintColors={{
                                        true: colors.GOLD,
                                        false: colors.GOLD,
                                    }}
                                  
                                />
                            
                            <Text style={{
                                marginLeft: 16,
                                fontSize: 16,
                                color: colors.TEXT,
                            }}>
                                Я ознакомлен с вышеизложенными условиями.
                            </Text>
                        </View>
                        <View style={{
                            paddingHorizontal: 85,
                            marginTop: 20,
                        }}>
                            <FlatButton primary text="Оплатить" onPress={_onPress}/>
                        </View>
                    </View>
                    </>
                }
                {
                    paymentUrl.length > 0 &&
                    <AutoHeightWebView
                        scalesPageToFit={true}
                        zoomable={false}
                        style={{
                            marginTop: 0,
                            width: width,
                        }}
                        source={{uri: paymentUrl}}
                    />
                }

            </ScrollView>
        </KeyboardAvoidingView>
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

export default observer(Payment);