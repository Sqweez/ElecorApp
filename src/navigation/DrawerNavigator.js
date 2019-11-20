import React from 'react';
import {Platform, Dimensions} from 'react-native';
import {createAppContainer} from "react-navigation";
import {createDrawerNavigator} from "react-navigation-drawer";

import Home2 from "../screens/Home2";
import Home from "../screens/Home";
import DrawerMenu from "../components/DrawerMenu";
import Service from "../screens/Service";
import Order from "../screens/Order";

const WIDTH = Dimensions.get('window').width;

const drawerConfig = {
    drawerWidth: WIDTH * 0.83,
    // initialRouteName: 'Order',
    contentComponent: (props) => {
        return (
          <DrawerMenu {...props}/>
        );
    }
};

const DrawerNavigator = createDrawerNavigator(
    {
        Home: {
            screen: Home
        },
        Home2: {
            screen: Home2
        },
        Service: {
            screen: Service
        },
        Order: {
            screen: Order
        }
    },
    drawerConfig
);

export default createAppContainer(DrawerNavigator);