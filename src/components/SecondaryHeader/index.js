import React, {useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Platform, StatusBar, SafeAreaView} from 'react-native';
import colors from "../../consts/colors";
import {Icon} from "native-base";
import {withNavigation} from 'react-navigation';
function SecondaryHeader(props) {
    const {children} = props;
    return(
        <SafeAreaView style={styles.wrapper}>
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <View style={styles.leftSide}>
                        <TouchableOpacity
                            style={styles.leftSide}
                            onPress={() =>
                        {props.onPress ? props.onPress() : props.navigation.goBack()}
                        }>
                            <Icon name="arrow-back" style={styles.icon}/>
                            <Text style={styles.text}>{props.text || 'Назад'}</Text>
                        </TouchableOpacity>

                    </View>
                    {children}
                </View>
            </View>
        </SafeAreaView>
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
    },
    leftSide: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    headerContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});

export default withNavigation(SecondaryHeader);