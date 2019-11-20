import React, {useContext} from 'react';
import {Dimensions, View, TouchableOpacity, Text, Image, StyleSheet, TouchableNativeFeedback} from 'react-native';
import colors from "../../consts/colors";
import App from "../../App";
import {withNavigation} from 'react-navigation';
const width = Dimensions.get('window').width;

const itemSize = Math.floor(width / 3);

function ServiceItem(props) {
    return (
        <TouchableNativeFeedback
            onPress={() => {
                props.navigation.navigate('Service', {
                    title: props.title
                })
            }}
        >
            <View style={{...styles.container}}>
                <View style={styles.wrapper}>
                    <View style={styles.imageWrapper}>
                        <Image
                            source={props.icon}
                            style={styles.image}/>
                    </View>
                    <Text style={styles.text} textBreakStrategy='simple'>{props.title}</Text>
                </View>
            </View>
        </TouchableNativeFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        height: itemSize,
        width: itemSize,
        flexWrap: 'wrap',
        borderWidth: .5,
        borderColor: colors.BORDER,
        backgroundColor: colors.BACKGROUND,
    },
    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    text: {
        textAlign: 'center',
        paddingRight: width * 0.064,
        paddingLeft: width * 0.064,
        marginTop: 10,
        flex: 1.6,
    },
    image: {
        width: 36,
        height: 36,
        marginTop: 16,
        resizeMode: 'contain'
    },
    imageWrapper: {
        flex: 1,
    }
});

export default withNavigation(ServiceItem);