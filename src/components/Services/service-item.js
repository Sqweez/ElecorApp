import React, {useContext} from 'react';
import {Dimensions, View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import colors from "../../consts/colors";
import {withNavigation} from 'react-navigation';
const width = Dimensions.get('window').width;
import {observer} from "mobx-react-lite";
import services from "../../store/services";

const itemSize = Math.floor(width / 3);

function ServiceItem(props) {

    const serviceStore = useContext(services);

    const navigate = async (id) => {
      await serviceStore.setService(id);
      props.navigation.navigate("Service");
    };

    return (
        <TouchableOpacity
            onPress={() => navigate(props.id)}
        >
            <View style={{...styles.container}}>
                <View style={styles.wrapper}>
                    <View style={styles.imageWrapper}>
                        <Image
                            source={{uri: props.icon}}
                            style={styles.image}/>
                    </View>
                    <View style={styles.textContainer}>
                        <Text
                            style={styles.text}
                        >{props.title}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
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
    },
    image: {
        width: 36,
        height: 36,
        marginTop: 16,
        resizeMode: 'contain'
    },
    imageWrapper: {
        flex: 1,
    },
    textContainer: {
        paddingHorizontal: 5,
        marginTop: 10,
        flex: 1.6,
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        textAlign: 'center'
    }
});

export default withNavigation(observer(ServiceItem));