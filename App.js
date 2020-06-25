import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import QuotesList from './src/QuotesList';
import AddQuote from './src/AddQuote';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="List"
          component={QuotesList}
          options={{ title: 'Words of wisdom' }}
        /> 
        <Stack.Screen 
          name="Add"
          component ={AddQuote}
          options={{ title: 'Tell your truth' }}          
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}