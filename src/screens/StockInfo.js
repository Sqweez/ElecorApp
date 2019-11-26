import React from 'react';
import {View, StyleSheet, Dimensions, ScrollView, Image, Text} from 'react-native';
import SecondaryHeader from "../components/SecondaryHeader";
import PageHeading from "../components/PageHeading";
import colors from "../consts/colors";

const width = Dimensions.get('window').width;

function StockInfo(props) {
    return (
        <View style={{flex: 1}}>
            <SecondaryHeader text="Назад"/>
            <ScrollView>
                <PageHeading heading="Внимание, акция!"/>
                <View style={{
                    alignItems: 'center'
                }}>
                    <Image
                        style={styles.image}
                        source={{uri: 'https://i.ibb.co/rf7rs2Z/banner2.jpg'}}
                    />
                </View>
                <Text style={styles.text}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque dapibus augue non ullamcorper
                    molestie. Aliquam lorem nisi, hendrerit ut pharetra et, pellentesque vitae mi. Orci varius natoque
                    penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent mi ipsum, aliquam in
                    ante ut, vehicula viverra orci. Sed volutpat lacus id placerat varius. Praesent ullamcorper diam
                    fermentum ante lobortis convallis. Curabitur quis turpis at odio feugiat tristique. Suspendisse
                    tortor dui, viverra posuere magna sed, viverra porta diam. Sed velit odio, dignissim vitae sapien
                    interdum, porta cursus neque.
                </Text>
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

export default StockInfo;