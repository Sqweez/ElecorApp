import React from 'react';
import {View, StyleSheet, TouchableNativeFeedback, Text} from 'react-native';
import colors from "../../consts/colors";

function FlatButton(props) {
    return(
        <TouchableNativeFeedback
            onPress={props.onPress || null}>
            <View style={
                {
                    ...styles.button,
                    backgroundColor: props.primary ? colors.GOLD : colors.DARKGREY
                }}>
                <Text style={styles.buttonText}>{props.text || props.children}</Text>
            </View>
        </TouchableNativeFeedback>
    );
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 100,
        paddingTop: 15,
        overflow: 'hidden',
        paddingBottom: 15,
    },
    buttonText: {
        color: colors.WHITE,
        textAlign: 'center',
        fontSize: 16,
        textTransform: 'uppercase',
        fontWeight: 'bold'
    }
});

export default FlatButton;