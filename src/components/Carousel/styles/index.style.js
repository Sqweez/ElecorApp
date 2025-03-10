import {StyleSheet} from 'react-native';

export const colors = {
    black: '#1a1917',
    gray: '#888888',
    background1: '#B721FF',
    background2: '#21D4FD',
};

export default StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.black,
    },
    container: {
        flex: 1,
        backgroundColor: colors.background1,
    },
    gradient: {
        ...StyleSheet.absoluteFillObject,
    },
    scrollview: {
        flex: 1,
    },
    exampleContainer: {
        paddingVertical: 30,
    },
    exampleContainerDark: {
        backgroundColor: colors.black,
    },
    exampleContainerLight: {
        backgroundColor: 'white',
    },
    title: {
        backgroundColor: 'transparent',
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    titleDark: {
        color: colors.black,
    },
    subtitle: {
        backgroundColor: 'transparent',
        color: 'rgba(255, 255, 255, 0.75)',
        fontSize: 13,
        fontStyle: 'italic',
        textAlign: 'center',
    },
    slider: {
        overflow: 'visible', // for custom animations
    },
    sliderContentContainer: {},
    paginationContainer: {
        paddingVertical: 8,
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 8,
    },
});
