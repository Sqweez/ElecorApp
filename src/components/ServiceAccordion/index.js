import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Icon} from "native-base";
import colors from "../../consts/colors";


function renderChild(data) {
    return data.map((m, key) => {
       return <View style={styles.child} key={key}>
           <Text style={{color: colors.TEXT, fontSize: 16}}>{m.title}</Text>
           <Text style={{color: colors.GOLD, fontSize: 16}}>{m.value}</Text>
       </View>
    });
}

function ServiceAccordion(props) {

    const [expanded, toggleExpanded] = useState(false);

    const {title} = props;

    const data = [
        {
            title: 'Баланс:',
            value: '11231 тнг'
        },
        {
            title: 'Лицевой счет:',
            value: '087/87'
        }
    ];

    return(
        <View>
            <TouchableOpacity
                onPress={() => toggleExpanded(!expanded)}
                style={styles.container}>
            <Text style={styles.text}>{title}</Text>
                <Icon style={styles.icon} type="FontAwesome" name={expanded ? 'chevron-up' : 'chevron-down'} />
            </TouchableOpacity>
            <View>
                {
                    expanded &&
                    renderChild(data)
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingVertical: 13,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    icon: {
        fontSize: 20,
        color: colors.GOLD,
    },
    text: {
        color: colors.TEXT,
        fontSize: 16
    },
    child: {
        paddingHorizontal: 32,
        flexDirection: 'row',
        paddingVertical: 13,
        justifyContent: 'space-between'
    }

});

export default ServiceAccordion;