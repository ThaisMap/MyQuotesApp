import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import TaskList from './pages/TaskList';
import QuotesList from './pages/QuotesList';
import SingleQuote from './pages/SingleQuote';

const AppStack = createStackNavigator();

const Routes = () => {
    return (
        <NavigationContainer>
            <AppStack.Navigator>
                <AppStack.Screen name="TaskList" component={TaskList} />
                <AppStack.Screen name="QuotesList" component={QuotesList} />
                <AppStack.Screen name="SingleQuote" component={SingleQuote} />
            </AppStack.Navigator>
        </NavigationContainer>
    );
};

export default Routes;