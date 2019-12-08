import React, {useContext} from 'react';
import {View, StyleSheet, Dimensions, ScrollView, Image, Text} from 'react-native';
import SecondaryHeader from "../components/SecondaryHeader";
import PageHeading from "../components/PageHeading";
import colors from "../consts/colors";
import {observer} from 'mobx-react-lite';
import stocks from "../store/stocks";
const width = Dimensions.get('window').width;
import { WebView } from 'react-native-webview';
import HTML from 'react-native-render-html';

function StockInfo(props) {

    const stockStore = useContext(stocks);

    const {title, body, image} = stockStore.stock;

    return (
        <View style={{flex: 1}}>
            <SecondaryHeader text="Назад"/>
            <ScrollView>
                <PageHeading heading={title}/>
                <View style={{
                    alignItems: 'center'
                }}>
                    <Image
                        style={styles.image}
                        source={{uri: image}}
                    />
                </View>
                <View style={{
                    paddingHorizontal: 20,
                }}>
                    <HTML html={body} allowedStyles={styles.text}/>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {},
    image: {
        marginVertical: 16,
        width: width * 0.7,
        paddingHorizontal: 50,
        aspectRatio: 2,
    },
    text: {
        paddingHorizontal: 20,
        fontSize: 16,
        color: colors.TEXT,
        lineHeight: 22,
    }
});

export default observer(StockInfo);