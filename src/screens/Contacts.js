import React, {useState, useContext, useEffect} from 'react';
import {View, StyleSheet, Text,Image, ScrollView, Platform, KeyboardAvoidingView, TextInput, Dimensions, TouchableOpacity} from 'react-native';
import SecondaryHeader from "../components/SecondaryHeader";
import PageHeading from "../components/PageHeading";
import colors from "../consts/colors";
import {Linking} from 'react-native';
import FlatButton from "../components/FlatButton";
import User from "../store/User";
import {getContacts, sendFeedback} from "../api/client";
import SimpleToast from "react-native-simple-toast";
import { WebView } from 'react-native-webview';
import Spinner from "react-native-spinkit";
const { width, height } = Dimensions.get('window');

const mapImage = require('../assets/images/map.jpg');

function AboutItem(props) {
    const {title, value} = props;
    return (
        <View style={{maxWidth: width * 0.75, marginBottom: 15}}>
            <Text style={{fontWeight: 'bold', fontSize: 16}}>{title}</Text>
            <Text style={{fontSize: 16}}>{value}</Text>
        </View>
    );
}

function PhoneItem(props) {
    const {title, value} = props;
    return (
        <TouchableOpacity onPress={() => Linking.openURL(`tel:${value}`)}>
            <View style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: 12,
            }}>
                <Text style={{
                    fontSize: 16,
                    color: colors.TEXT
                }}>{title}</Text>
                <Text style={{
                    fontSize: 16,
                    color: colors.GOLD,
                }}>{value}</Text>
            </View>
        </TouchableOpacity>
    );
}

function renderAboutItem(aboutCompany) {
    return aboutCompany.map((m, key) => {
        return (
            <AboutItem title={m.key} value={m.value} key={key}/>
        );
    })
}


function Contacts(props) {

    const userStore = useContext(User);

    const [aboutCompany, setAboutCompany] = useState([]);

    const [loading, setLoading] = useState(true);

    const [companyPhones, setCompanyPhones] = useState([]);

    const [feedbackText, setFeedbackText] = useState('');

    const [title, setTitle] = useState('');

    const [map, setMap] = useState('');

    const renderPhoneItem = (phoneItems) => {
        return phoneItems.map((p, key) => {
            if (p.key === 'Дежурная часть' && !userStore.isLoggedIn) {
                return null;
            }
                return (
                    <PhoneItem title={p.key} value={p.value} key={key}/>
                );
        });
    };

    useEffect(() => {
        (async () => {
            const contacts = await getContacts();
            setTitle(contacts.title);
            setAboutCompany(JSON.parse(contacts.information));
            setCompanyPhones(JSON.parse(contacts.phones));
            setMap(contacts.map);
            setLoading(false);
        })()
    }, []);

    const _sendFeedback = async () => {
        console.log(1);
        const feedback = {
            feedback: feedbackText,
            client_id: userStore.user_id
        };
        await sendFeedback(feedback);
        setFeedbackText('');
        SimpleToast.show("Ваше сообщение было доставлено! Менеджер компании свяжется с вами в ближайшее время!", 5000);
    };

    const _renderFeedback = async () => {
    }

    return(
        <KeyboardAvoidingView
            enabled
            style={{flex: 1}}
            behavior={Platform.OS === "ios" ? "margin" : null}>
            <SecondaryHeader text={'Контакты'}/>
            <View>
                <Spinner
                    style={styles.spinner}
                    isVisible={loading}
                    color={colors.GOLD}
                    size={40}
                    type="Wave"
                />
            </View>
            {!loading &&
            <ScrollView>
                <PageHeading heading={title}/>
                <View style={styles.container}>
                    {renderAboutItem(aboutCompany)}
                    <Text style={{color: colors.DARKGREY, fontSize: 16, marginBottom: 8}}>Телефоны:</Text>
                    {renderPhoneItem(companyPhones)}
                </View>
                { userStore.isLoggedIn &&
                <View style={{
                    backgroundColor: colors.BORDER,
                    paddingVertical: 12,
                    marginTop: -10,
                    paddingHorizontal: 16,
                }}>
                    <Text style={{
                        color: colors.DARKGREY,
                        fontSize: 16,
                    }}>Обратная связь
                    </Text>
                </View>}
                {userStore.isLoggedIn &&
                <View style={styles.container}>
                    <Text style={{
                        color: colors.DARKGREY,
                        fontSize: 16
                    }}>Если у вас есть вопрос, напишите нам:</Text>
                    <View>
                        <TextInput
                            multiline
                            value={feedbackText}
                            onChangeText={(text) => setFeedbackText(text)}
                            numberOfLines={4}
                            style={styles.textArea}/>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>
                        <Text style={{
                            flex: 1,
                            color: colors.DARKGREY,
                        }}>Мы свяжемся с вами в ближайшее рабочее время</Text>
                        <View style={{
                            flex: 1
                        }}>
                            <FlatButton
                                onPress={_sendFeedback}
                                text="Отправить"
                                primary/>
                        </View>
                    </View>
                </View>}
                <View style={{
                    backgroundColor: colors.BORDER,
                    paddingVertical: 12,
                    paddingHorizontal: 16,
                }}>
                    <Text style={{
                        color: colors.DARKGREY,
                        fontSize: 16,
                    }}>Карта:
                    </Text>
                </View>
                <View style={{
                    width: width,
                    height: 214,
                    marginBottom: 0,
                    backgroundColor: 'gold'
                }}>
                    <WebView
                        source={{uri: map}}
                    />
                </View>
            </ScrollView>
            }
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    textArea: {
        marginTop: 14,
        borderColor: colors.BORDER,
        borderWidth: 1,
        borderRadius: 2,
        paddingVertical: 6,
        paddingLeft: 6,
        color: colors.TEXT,
        marginBottom: 20,
        textAlignVertical: 'top'
    },
    spinner: {
        position: 'absolute',
        top: height / 2.7,
        left: width / 2.3,
    }
});

export default Contacts;