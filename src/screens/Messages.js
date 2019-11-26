import React, {useState, useEffect, useContext} from 'react';
import {View, StyleSheet, Modal, Text, ScrollView} from 'react-native';
import SecondaryHeader from "../components/SecondaryHeader";
import MessageItem from "../components/MessageItem";
import MessageModal from "../components/Modal/MessageModal";
import {observer} from 'mobx-react';
import MessageStoreContext from "../store/messages";
import {MessageModalContext} from "../store/modal/messageModal";

function renderMessages(messages, onPress, setMessage) {

    const modalStore = useContext(MessageModalContext);

    return messages.map((m, index) => {
        return (
            <MessageItem message={m} key={index} onPress={() => modalStore.showModal(m)}/>
        );
    })
}

function onMessageClose(messageStore, modalStore) {
    const {id} = modalStore.modal.message;
    messageStore.checkAsRead(id);
    modalStore.closeModal();
}

function Messages(props) {

    let [modalVisibility, setVisibility] = useState(false);

    const messageStore = useContext(MessageStoreContext);

    const modalStore = useContext(MessageModalContext);

    return(
        <View>
            <MessageModal visibility={modalStore.modal.show} onBackdropPress={() => onMessageClose(messageStore, modalStore)}/>
            <SecondaryHeader text="Сообщения" />
            <ScrollView>
                <View style={styles.container}>
                    {renderMessages(messageStore.allMessages, () => setVisibility(!modalVisibility))}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 20
    },
});

export default observer(Messages);