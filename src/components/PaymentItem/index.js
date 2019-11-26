import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import colors from "../../consts/colors";

function PaymentItem(props) {

    const positive = props.positive || false;

    return(
        <View style={styles.container}>
            <View style={{...styles.justifyBetween, marginBottom: 6}}>
                <Text style={{color: colors.TEXT, fontSize: 16}}>
                    Мобильная тревожная кнопка
                </Text>
                <Text style={{color: positive ? '#219653' : '#ff0000', fontSize: 16}}>+15000</Text>
            </View>
            <View style={{...styles.justifyBetween}}>
                <Text style={styles.bottomText}>056/87</Text>
                <Text style={styles.bottomText}>12.10.2019</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingVertical: 13,
        borderBottomColor: colors.BORDER,
        borderBottomWidth: 1
    },
    justifyBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    bottomText: {
        color: colors.DARKGREY,
        fontSize: 14
    }
});

export default PaymentItem;