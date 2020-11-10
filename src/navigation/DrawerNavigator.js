import React from 'react';
import {StatusBar, Dimensions, SafeAreaView} from 'react-native';
import {createAppContainer} from "react-navigation";
import {createDrawerNavigator} from "react-navigation-drawer";
import {createStackNavigator} from "react-navigation-stack";

import DrawerMenu from "../components/DrawerMenu";
import routes from "./routes";
import colors from "../consts/colors";
const WIDTH = Dimensions.get('window').width;


const drawerConfig = {
    drawerWidth: WIDTH * 0.83,
    contentComponent: (props) => {
        return (
            <>
                <StatusBar
                    barStyle="dark-content"
                    backgroundColor={colors.WHITE}/>
                <DrawerMenu {...props}/>
            </>
        );
    }
};

const stackNavigator = createStackNavigator(
    routes,
    {
        initialRouteName: 'Home',
        headerMode: 'none',
        mode: 'card',
        defaultNavigationOptions: {
            gesturesEnabled: false,
        },
    }
);

const DrawerNavigator = createDrawerNavigator({
    Home: stackNavigator
}, drawerConfig);

export default createAppContainer(DrawerNavigator);