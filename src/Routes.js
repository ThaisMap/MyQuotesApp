import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';

import QuotesList from './QuotesList';
import AddQuote from './AddQuote';
import SingleQuote from './SingleQuote';
 
const BottomNavigationExample = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'add', title: 'Add', icon: 'account' },
    { key: 'list', title: 'List', icon: 'account-minus' },
    { key: 'random', title: 'Random', icon: 'account-alert' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    add: AddQuote,
    list: QuotesList,
    random: SingleQuote,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

BottomNavigationExample.title = 'Bottom Navigation';

export default BottomNavigationExample;
 
