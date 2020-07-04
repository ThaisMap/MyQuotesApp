import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomNavigationTab from './src/Routes';

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator headerMode={false}>
                <Stack.Screen
                    name="BottomTab"
                    component={BottomNavigationTab}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
