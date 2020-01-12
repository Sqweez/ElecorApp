import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import colors from "../../consts/colors";

function formatAccount(_account) {
    let arr = _account.replace(/(\d{2})/g, '$1,').split(',');
    return arr.join(' ');
}

function PaymentItem(props) {

    const { data } = props;

    const positive = data.balance > 0;

    return(
        <View style={styles.container} key={data.id}>
            <View style={{...styles.justifyBetween, marginBottom: 6}}>
                <Text style={{color: colors.TEXT, fontSize: 16}}>
                    {data.service_name}
                </Text>
                <Text style={{color: positive ? '#219653' : '#ff0000', fontSize: 16}}>
                    {positive ? `+${data.balance}` : data.balance}
                </Text>
            </View>
            <View style={{...styles.justifyBetween}}>
                <Text style={styles.bottomText}>{formatAccount(data.personal_account)}</Text>
                <Text style={styles.bottomText}>{data.date}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingVertical: 13,
        borderRadius: 10,
        borderBottomColor: colors.BORDER,
        borderBottomWidth: 1,
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