import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Icon} from "native-base";
import colors from "../../consts/colors";



function formatAccount(_account) {
    let arr = _account.replace(/(\d{2})/g, '$1,').split(',');
    return arr.join(' ');
}

function ServiceAccordion(props) {

    const [expanded, toggleExpanded] = useState(false);

    useEffect(() => {
        toggleExpanded(props.expanded);
    }, []);

    const {title, data} = props;

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
                    <View>
                        <View style={styles.child}>
                            <Text style={{color: colors.TEXT, fontSize: 16}}>Баланс:</Text>
                            <Text style={{color: colors.GOLD, fontSize: 16}}>{data.balance} тенге</Text>
                        </View>
                        <View style={styles.child}>
                            <Text style={{color: colors.TEXT, fontSize: 16}}>Лицевой счет:</Text>
                            <Text style={{color: colors.GOLD, fontSize: 16}}>{formatAccount(data.personal_account)}</Text>
                        </View>
                    </View>
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