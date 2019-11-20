import React, {useContext} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Platform, StatusBar} from 'react-native';
import colors from "../../consts/colors";
import {Icon} from "native-base";

function SecondaryHeader(props) {
    return(
        <View style={styles.wrapper}>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => props.navigation.goBack()}>
                    <Icon name="arrow-back" style={styles.icon}/>
                </TouchableOpacity>
                <Text style={styles.text}>{props.text || 'Назад'}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },
    container: {
        width: '100%',
        paddingVertical: 16,
        paddingLeft: 16,
        backgroundColor: colors.BACKGROUND,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: 2,
    },
    icon: {
        color: colors.GOLD,
    },
    text: {
        fontSize: 18,
        marginLeft: 17,
        marginTop: -2
    }
});

export default SecondaryHeader;