import React, {useContext} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import colors from "../../consts/colors";

function MessageModal(props) {
    const visibility = props.visibility;
    const onBackdropPress = props.onBackdropPress;
    const message = props.message || {};
    return (
        <Modal isVisible={visibility} transparent onBackdropPress={onBackdropPress}>
            <View style={styles.container}>
                <Text style={styles.heading}>{message.title}</Text>
                <Text style={styles.text}>{message.body}</Text>
                <View style={styles.bottomContainer}>
                    <Text style={styles.date}>{message.date || ''}</Text>
                    <TouchableOpacity onPress={onBackdropPress}>
                        <Text style={styles.button}>Закрыть</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.WHITE,
        width: '100%',
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    heading: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 15,
        color: colors.TEXT
    },
    text: {
        fontSize: 16,
        lineHeight: 18,
        color: colors.TEXT,
        marginBottom: 12
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    date: {
        fontSize: 12,
        color: colors.DARKGREY,
    },
    button: {
        color: colors.GOLD,

    }
});

export default MessageModal;