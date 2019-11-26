import React, {useState} from 'react';
import {View, StyleSheet, Text,Image, ScrollView, Platform, KeyboardAvoidingView, TextInput, Dimensions, TouchableOpacity} from 'react-native';
import SecondaryHeader from "../components/SecondaryHeader";
import PageHeading from "../components/PageHeading";
import colors from "../consts/colors";
import {Linking} from 'react-native';
import FlatButton from "../components/FlatButton";

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
            <AboutItem title={m.title} value={m.value} key={key}/>
        );
    })
}

function renderPhoneItem(phoneItems) {
    return phoneItems.map((p, key) => {
        return (
            <PhoneItem title={p.title} value={p.value} key={key}/>
        );
    });
}

function Contacts(props) {

    const [aboutCompany, setAboutCompany] = useState([
        {
            title: 'Адрес:',
            value: 'Республика Казахстан, г. Павлодар, ул Академика Чокина, 42, офис 81, 82'
        },
        {
            title: 'График работы:',
            value: 'ПН-ПТ с 9:00 до 18:00. 13:00-14:00 обед\nСБ-ВС выходной'
        }
    ]);

    const [companyPhones, setCompanyPhones] = useState([
        {
            title: 'Офис',
            value: '+7 7182 20 98 29'
        },
        {
            title: 'Менеджер',
            value: '+7 775 204 67 94'
        },
        {
            title: 'Дежурный пульт',
            value: '+7 747 807 50 87'
        },
    ]);

    return(
        <KeyboardAvoidingView
            enabled
            style={{flex: 1}}
            behavior={Platform.OS === "ios" ? "margin" : null}>
            <SecondaryHeader text={'Контакты'}/>
            <ScrollView>
                <PageHeading heading='ОА "ЭЛЕКОР"'/>
                <View style={styles.container}>
                    {renderAboutItem(aboutCompany)}
                    <Text style={{color: colors.DARKGREY, fontSize: 16, marginBottom: 8}}>Телефоны:</Text>
                    {renderPhoneItem(companyPhones)}
                </View>
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
                </View>
                <View style={styles.container}>
                    <Text style={{
                        color: colors.DARKGREY,
                        fontSize: 16
                    }}>Если у вас есть вопрос, напишите нам:</Text>
                    <View>
                        <TextInput multiline numberOfLines={4} style={styles.textArea}/>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>
                        <Text style={{
                            flex: 1,
                            color: colors.DARKGREY,
                        }}>Текст про время ответа менеджера</Text>
                        <View style={{
                            flex: 1
                        }}>
                            <FlatButton text="Отправить" primary/>
                        </View>
                    </View>
                </View>
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
                    <Image
                        style={{
                            width: null,
                            flex: 1,
                            height: null,
                            resizeMode: 'cover'
                        }}
                        source={mapImage}/>
                </View>
            </ScrollView>
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
    }
});

export default Contacts;