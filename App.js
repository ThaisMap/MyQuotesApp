import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Routes from './src/routes';

export default function App() {
  return (
    <Routes />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
