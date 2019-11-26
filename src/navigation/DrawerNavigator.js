import React from 'react';
import {Platform, Dimensions} from 'react-native';
import {createAppContainer} from "react-navigation";
import {createDrawerNavigator} from "react-navigation-drawer";
import {createStackNavigator} from "react-navigation-stack";

import DrawerMenu from "../components/DrawerMenu";
import routes from "./routes";

const WIDTH = Dimensions.get('window').width;

const drawerConfig = {
    drawerWidth: WIDTH * 0.83,
    contentComponent: (props) => {
        return (
            <DrawerMenu {...props}/>
        );
    }
};

const stackNavigator = createStackNavigator(
    routes,
    {
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