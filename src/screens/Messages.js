import React, {useState, useEffect, useContext} from 'react';
import {View, StyleSheet, BackHandler, ScrollView} from 'react-native';
import SecondaryHeader from "../components/SecondaryHeader";
import MessageItem from "../components/MessageItem";
import MessageModal from "../components/Modal/MessageModal";
import {observer} from 'mobx-react';
import User from "../store/User";


function Messages() {

    let [modalVisibility, setVisibility] = useState(false);

    let [message, setMessage] = useState(null);

    const userStore = useContext(User);

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", function () {
            console.log(1);
            if (modalVisibility === true) {
                onMessageClose();
            }
        })
    }, []);
    const onMessageClose = () => {
        setVisibility(false);
        setMessage(null);
    };

    const showModal = (message) => {
        setMessage(message);
        if (!message.read) {
            userStore.markAsRead(message.id);
        }
        setVisibility(true);
    };

    const renderMessageItems = (messages) => {
        return messages.map((m) => {
            return (
                <MessageItem
                    key={m.id}
                    message={m}
                    onPress={() => showModal(m)}
                />
            );
        })
    };

    return(
        <View>
            <MessageModal
                visibility={modalVisibility}
                message={message}
                onBackdropPress={onMessageClose}/>
            <SecondaryHeader text="Сообщения" />
            <ScrollView>
                <View style={styles.container}>
                    {renderMessageItems(userStore.messages)}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 20,
    },
});

export default observer(Messages);