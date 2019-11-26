import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import colors from "../../consts/colors";

function PageSubHeader(props) {

    const title = props.title || 'Заголовок';

    return(
        <View style={{
            backgroundColor: colors.BORDER,
            paddingVertical: 12,
            paddingHorizontal: 16,
        }}>
            <Text style={{
                color: colors.DARKGREY,
                fontSize: 16,
            }}>{title}
            </Text>
        </View>
    );
}

export default PageSubHeader;